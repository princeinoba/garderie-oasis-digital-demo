import { SettingsBoard } from "@/components/director/settings-board";

export const metadata = { title: "Director Settings" };

export default function SettingsPage() {
  return (
    <>
      <header className="director-page-heading">
        <div>
          <h1>Settings</h1>
          <p>Configure centre preferences and deterministic demonstration controls.</p>
        </div>
      </header>
      <SettingsBoard />
    </>
  );
}
