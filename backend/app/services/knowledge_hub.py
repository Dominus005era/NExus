import os
from pathlib import Path
from typing import List, Dict
from backend.app.core.config import settings
from backend.app.models.schemas import KnowledgeQueryRequest, KnowledgeQueryResponse, KnowledgeDocSnippet

# RBAC Permissions Policy
PERMISSIONS_MATRIX: Dict[str, Dict[str, bool]] = {
    # Requesting Agent -> Authorized Document Folders
    "sales": {
        "sales": True,
        "inventory": True,   # Read-only stockout alerts
        "finance": False,     # Denied by default unless cross-domain token granted
    },
    "inventory": {
        "sales": True,       # Read-only promotional calendars
        "inventory": True,
        "finance": False,    # Needs explicit reason for supplier contracts
    },
    "finance": {
        "sales": True,       # Revenue tracking
        "inventory": True,   # Valuation tracking
        "finance": True,
    },
    "orchestrator": {
        "sales": True,
        "inventory": True,
        "finance": True,
    }
}

class KnowledgeHubService:
    def __init__(self, docs_root: Path = settings.DOCS_PATH):
        self.docs_root = docs_root

    def query(self, req: KnowledgeQueryRequest) -> KnowledgeQueryResponse:
        agent = req.requesting_agent.lower()
        target_dept = req.department.lower()

        # 1. RBAC Verification
        agent_perms = PERMISSIONS_MATRIX.get(agent, {})
        has_direct_access = agent_perms.get(target_dept, False)

        if not has_direct_access:
            # Check for valid cross-domain exception
            if req.cross_domain_reason and len(req.cross_domain_reason.strip()) > 10:
                audit_msg = f"[AUDIT] Cross-domain authorization granted for agent '{agent}' accessing '{target_dept}' docs. Reason: {req.cross_domain_reason}"
                print(audit_msg)
            else:
                return KnowledgeQueryResponse(
                    access_granted=False,
                    status_message=f"[ACCESS DENIED] Agent '{agent}' does not have permission to inspect '{target_dept}' documents without a verified operational justification.",
                    snippets=[]
                )

        # 2. Document Search & Retrieval
        dept_dir = self.docs_root / target_dept
        if not dept_dir.exists():
            return KnowledgeQueryResponse(
                access_granted=True,
                status_message=f"Department rack '{target_dept}' not found on storage.",
                snippets=[]
            )

        snippets: List[KnowledgeDocSnippet] = []
        keywords = [k.lower() for k in req.query_text.split() if len(k) > 2]

        for file_path in dept_dir.glob("*.md"):
            try:
                content = file_path.read_text(encoding="utf-8")
                # Simple relevance scoring based on keyword overlap
                match_count = sum(content.lower().count(kw) for kw in keywords)
                
                # Extract relevant paragraphs
                paragraphs = [p.strip() for p in content.split("\n\n") if p.strip()]
                best_paragraphs = []
                for p in paragraphs:
                    p_score = sum(p.lower().count(kw) for kw in keywords)
                    if p_score > 0:
                        best_paragraphs.append(p)

                if match_count > 0 or not keywords:
                    snippet_text = "\n\n".join(best_paragraphs[:2]) if best_paragraphs else content[:500]
                    score = min(1.0, 0.3 + (match_count * 0.15))
                    snippets.append(
                        KnowledgeDocSnippet(
                            doc_name=file_path.name,
                            department=target_dept,
                            snippet=snippet_text,
                            relevance_score=round(score, 2)
                        )
                    )
            except Exception as e:
                print(f"Error reading {file_path}: {e}")

        # Sort snippets by relevance score
        snippets.sort(key=lambda s: s.relevance_score, reverse=True)

        return KnowledgeQueryResponse(
            access_granted=True,
            status_message=f"✅ Retrieved {len(snippets)} relevant snippets from {target_dept} rack.",
            snippets=snippets
        )

knowledge_hub = KnowledgeHubService()
