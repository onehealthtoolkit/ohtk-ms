import { FormEvent, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import PublicLegalPage from "components/legal/publicLegalPage";
import { getSupportEmail } from "lib/supportEmail";

const fieldClass =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-800";
const labelClass = "block text-sm font-bold mb-2";

const AccountDeletionPage: NextPage = () => {
  const supportEmail = getSupportEmail();
  const [username, setUsername] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [tenant, setTenant] = useState("");
  const [notes, setNotes] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent("LAHIS account deletion request");
    const body = encodeURIComponent(
      [
        "Please delete my LAHIS account and associated personal data.",
        "",
        `Username: ${username}`,
        `Contact email: ${contactEmail}`,
        `Server or tenant: ${tenant}`,
        `Notes: ${notes}`,
      ].join("\n")
    );
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <PublicLegalPage title="Account Deletion">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Request account deletion
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        This page does not require a sign-in. Use it to ask LAHIS to delete your
        account.
      </p>

      <h2 className="text-lg font-semibold text-gray-800 mt-2 mb-3">
        What is deleted
      </h2>
      <ul className="list-disc pl-5 space-y-1 mb-3">
        <li>
          Personal account information is permanently deleted after the request
          is verified.
        </li>
        <li>
          Reports you already submitted may be kept for legal and regulatory
          reasons. Personal details are removed or anonymized on those records.
        </li>
        <li>
          Data stored only on your phone can be removed by signing out, clearing
          app data, or uninstalling the app. That does not delete server-side
          records by itself.
        </li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-3">
        How to request deletion
      </h2>
      <ol className="list-decimal pl-5 space-y-2 mb-4">
        <li>
          If you have a dashboard login, sign in and open{" "}
          <Link
            href="/account/request-to-delete/"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Request to delete my account
          </Link>
          .
        </li>
        <li>
          If you only use the mobile app, or you cannot sign in, send a request
          with the form below or email{" "}
          <a
            className="text-indigo-600 hover:text-indigo-800"
            href={`mailto:${supportEmail}?subject=${encodeURIComponent(
              "LAHIS account deletion request"
            )}`}
          >
            {supportEmail}
          </a>
          . Include your username, a contact email, and the server or tenant
          name shown in the app.
        </li>
      </ol>
      <p className="mb-4">
        We process requests after we can confirm the account. We may ask a
        follow-up question if the details are incomplete.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className={labelClass} htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className={fieldClass}
            value={username}
            onChange={event => setUsername(event.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="contactEmail">
            Contact email
          </label>
          <input
            id="contactEmail"
            type="email"
            className={fieldClass}
            value={contactEmail}
            onChange={event => setContactEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="tenant">
            Server or tenant
          </label>
          <input
            id="tenant"
            className={fieldClass}
            placeholder="For example, LAHIS Demo"
            value={tenant}
            onChange={event => setTenant(event.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            className={fieldClass}
            rows={4}
            value={notes}
            onChange={event => setNotes(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="block w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
        >
          Send deletion request
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-500">
        The button opens your email app with a message addressed to{" "}
        {supportEmail}. If that does not work, copy the same details into an
        email yourself.
      </p>
      <p className="mt-4 text-sm">
        Related:{" "}
        <Link
          href="/privacy-policy/"
          className="text-indigo-600 hover:text-indigo-800"
        >
          Privacy policy
        </Link>
      </p>
    </PublicLegalPage>
  );
};

export default AccountDeletionPage;
