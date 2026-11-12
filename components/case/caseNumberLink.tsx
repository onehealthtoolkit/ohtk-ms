import Link from "next/link";

type CaseNumberLinkProps = {
  caseId?: string | null;
  caseNumber?: string | null;
};

export default function CaseNumberLink({
  caseId,
  caseNumber,
}: CaseNumberLinkProps) {
  if (!caseId || !caseNumber) return <span>—</span>;

  return (
    <Link
      href={`/cases/${caseId}`}
      className="whitespace-nowrap font-medium text-blue-700 hover:underline"
      onClick={event => event.stopPropagation()}
    >
      {caseNumber}
    </Link>
  );
}
