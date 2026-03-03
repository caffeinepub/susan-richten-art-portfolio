import { CommissionInquiry, useCMS } from "../../contexts/CMSContext";

interface InquiryRowProps {
  inquiry: CommissionInquiry;
}

const statusOrder: CommissionInquiry["status"][] = ["unread", "read", "responded"];

export function InquiryRow({ inquiry }: InquiryRowProps) {
  const { updateCommissionInquiry } = useCMS();

  const cycleStatus = () => {
    const currentIndex = statusOrder.indexOf(inquiry.status);
    const next = statusOrder[(currentIndex + 1) % statusOrder.length];
    updateCommissionInquiry(inquiry.id, { status: next });
  };

  const statusColors: Record<CommissionInquiry["status"], string> = {
    unread: "bg-amber-100 text-amber-700",
    read: "bg-blue-100 text-blue-700",
    responded: "bg-green-100 text-green-700",
  };

  return (
    <div
      className={`border border-border rounded-md p-4 ${
        inquiry.status === "unread" ? "border-l-4 border-l-amber-400 bg-amber-50/30" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-medium text-foreground">{inquiry.name}</span>
            <span className="text-xs text-muted-foreground">{inquiry.email}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[inquiry.status]}`}>
              {inquiry.status}
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground mb-2">
            <span>Budget: {inquiry.budget || inquiry.budgetRange || "—"}</span>
            <span>Timeline: {inquiry.timeline || "—"}</span>
            {inquiry.projectType && <span>Type: {inquiry.projectType}</span>}
          </div>
          {(inquiry.projectDescription || inquiry.description) && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {inquiry.projectDescription || inquiry.description}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            {new Date(inquiry.submittedAt).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={cycleStatus}
          className="shrink-0 text-xs px-3 py-1.5 border border-border rounded-md hover:bg-muted transition-colors"
        >
          Mark {statusOrder[(statusOrder.indexOf(inquiry.status) + 1) % statusOrder.length]}
        </button>
      </div>
    </div>
  );
}

export default InquiryRow;
