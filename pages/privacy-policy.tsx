import { NextPage } from "next";
import Link from "next/link";
import PublicLegalPage from "components/legal/publicLegalPage";
import { getSupportEmail } from "lib/supportEmail";

const sectionTitle = "text-lg font-semibold text-gray-800 mt-8 mb-3";
const list = "list-disc pl-5 space-y-1 mb-3";

const PrivacyPolicyPage: NextPage = () => {
  const supportEmail = getSupportEmail();

  return (
    <PublicLegalPage title="Privacy Policy">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-6">
        Effective date: 17 August 2026. Last updated: 17 August 2026.
      </p>
      <p className="mb-3">
        This policy describes how the LAHIS mobile app and the LAHIS dashboard
        access, collect, use, store, and share information. LAHIS is a livestock
        and community health surveillance system used by authorized reporters
        and official staff.
      </p>

      <h2 className={sectionTitle}>Contact</h2>
      <p className="mb-3">
        For privacy questions, data requests, or account deletion, email{" "}
        <a
          className="text-indigo-600 hover:text-indigo-800"
          href={`mailto:${supportEmail}`}
        >
          {supportEmail}
        </a>
        . You can also use the public{" "}
        <Link
          href="/account-deletion/"
          className="text-indigo-600 hover:text-indigo-800"
        >
          account deletion
        </Link>{" "}
        page.
      </p>

      <h2 className={sectionTitle}>Information we collect</h2>
      <p className="mb-3">
        The exact fields depend on your tenant, role, and the forms your
        organization configures. LAHIS may collect:
      </p>
      <ul className={list}>
        <li>
          Account and profile data: name, username, user ID, role, authority,
          village, email, phone, and profile photo.
        </li>
        <li>
          Optional registration fields such as age and gender when a tenant
          enables them.
        </li>
        <li>
          Authentication data: passwords submitted at sign-in or registration,
          tokens, cookies, session data, QR login data, and consent status.
        </li>
        <li>
          Report, observation, follow-up, comment, and census content, including
          any health or livestock details entered in those forms.
        </li>
        <li>
          Photos, files, audio, or video attached to reports, comments,
          observations, or a profile.
        </li>
        <li>
          Precise or approximate location when you attach a location to a report
          or map action. The mobile app requests location only after a user
          action and does not request background location.
        </li>
        <li>
          Device and app data used to operate the service: push-notification
          tokens, app version, diagnostics, Firebase Cloud Messaging, Firebase
          Remote Config, and Firebase Analytics data.
        </li>
        <li>
          Map request data sent to Google Maps when you view or pick a location.
        </li>
        <li>
          The Android app declares the Advertising ID permission because bundled
          Google/Firebase SDKs may access it. LAHIS does not use that identifier
          to show ads.
        </li>
      </ul>

      <h2 className={sectionTitle}>Information stored on the device</h2>
      <p className="mb-3">
        The mobile app stores some data locally so it can work offline. This may
        include authentication tokens, profile data, cookies, cached GraphQL
        data, and pending reports or attachments. Clearing app data or
        uninstalling the app removes local copies. It does not delete records
        already submitted to the server.
      </p>

      <h2 className={sectionTitle}>How we use information</h2>
      <ul className={list}>
        <li>Create, authenticate, and manage accounts.</li>
        <li>Connect the app to the correct tenant and authority.</li>
        <li>
          Submit and display reports, observations, follow-ups, comments,
          attachments, and census records.
        </li>
        <li>Show maps and record a location that you choose to attach.</li>
        <li>Send operational notifications.</li>
        <li>Keep drafts and pending submissions until they can be sent.</li>
        <li>
          Maintain security, prevent abuse, debug issues, and meet legal or
          public-health obligations.
        </li>
      </ul>

      <h2 className={sectionTitle}>How we share information</h2>
      <p className="mb-3">We do not sell personal information.</p>
      <p className="mb-3">We may share information with:</p>
      <ul className={list}>
        <li>
          The tenant organization and authorized staff who operate that LAHIS
          workspace.
        </li>
        <li>
          Service providers that host, store, transmit, or support the service,
          including hosting, database, file storage, email, maps, and Firebase /
          Google Cloud services.
        </li>
        <li>
          Integration partners that a tenant enables, such as configured
          webhooks or external systems.
        </li>
        <li>
          Government, legal, or public-health recipients when required by law or
          a valid official request.
        </li>
      </ul>

      <h2 className={sectionTitle}>Security</h2>
      <p className="mb-3">
        Production traffic is sent over HTTPS. Access is limited by account
        authentication and tenant-aware authorization. The mobile app stores
        tokens in platform secure storage and disables Android backup of the app
        data container. No method of transmission or storage is completely
        secure. Protect your device and password.
      </p>

      <h2 className={sectionTitle}>Retention</h2>
      <p className="mb-3">
        We keep account and operational data for as long as needed to provide
        LAHIS and to meet legal, public-health, audit, and security obligations.
        Retention can differ by tenant and report type.
      </p>
      <p className="mb-3">
        If you delete your account, personal account details are removed or
        anonymized. Reports you already submitted may be retained for legal and
        regulatory purposes, without your personal details remaining visible on
        those records.
      </p>

      <h2 className={sectionTitle}>Account and data deletion</h2>
      <p className="mb-3">
        You can request deletion of your account and associated personal data on
        the{" "}
        <Link
          href="/account-deletion/"
          className="text-indigo-600 hover:text-indigo-800"
        >
          account deletion
        </Link>{" "}
        page, or by emailing {supportEmail}. Dashboard users who can sign in may
        also use{" "}
        <Link
          href="/account/request-to-delete/"
          className="text-indigo-600 hover:text-indigo-800"
        >
          Request to delete my account
        </Link>
        .
      </p>

      <h2 className={sectionTitle}>Permissions</h2>
      <ul className={list}>
        <li>Internet: to reach the LAHIS API and supporting services.</li>
        <li>
          Location: to attach a site to a report or center a map, after you
          choose that action.
        </li>
        <li>
          Camera and files: to capture or attach photos and files used in
          reports or your profile.
        </li>
        <li>Notifications: to receive operational messages.</li>
      </ul>

      <h2 className={sectionTitle}>Children</h2>
      <p className="mb-3">
        LAHIS is intended for authorized community and official users. It is not
        directed at children.
      </p>

      <h2 className={sectionTitle}>Changes</h2>
      <p>
        We may update this policy when the app, service, or legal requirements
        change. The updated page will show a new last-updated date.
      </p>
    </PublicLegalPage>
  );
};

export default PrivacyPolicyPage;
