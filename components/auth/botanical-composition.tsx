import Image from "next/image";

/**
 * Decorative artwork shared by the authentication and information routes.
 *
 * Both art directions are rendered so CSS can switch them without client
 * JavaScript. A sibling page carrying `.auth-reference-wide` activates the
 * narrow abstract composition through the parent `:has()` selector.
 */
export function BotanicalComposition() {
  return (
    <div className="auth-botanical" aria-hidden="true">
      <div className="auth-botanical-scenic">
        <Image
          className="auth-botanical-room-image"
          src="/images/classroom-hero.png"
          alt=""
          fill
          sizes="(max-width: 760px) 100vw, 42vw"
          loading="eager"
        />

        <svg
          className="auth-botanical-scenic-shapes"
          viewBox="0 0 560 900"
          preserveAspectRatio="none"
          focusable="false"
        >
          <defs>
            <linearGradient id="auth-forest-sheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#103f30" />
              <stop offset="0.68" stopColor="#1e5e43" />
              <stop offset="1" stopColor="#315f45" />
            </linearGradient>
            <linearGradient id="auth-sage-sheen" x1="0" y1="0" x2="0.9" y2="1">
              <stop offset="0" stopColor="#d7dfa7" />
              <stop offset="1" stopColor="#8eaa70" />
            </linearGradient>
            <linearGradient id="auth-room-wash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fffaf0" stopOpacity=".08" />
              <stop offset=".72" stopColor="#fff9ea" stopOpacity=".02" />
              <stop offset="1" stopColor="#f7efd9" stopOpacity=".34" />
            </linearGradient>
          </defs>

          <path
            d="M0 0h390c48 105 59 196 24 274-36 80-117 121-175 178-57 57-84 131-79 222L0 721V0Z"
            fill="url(#auth-forest-sheen)"
          />
          <path
            d="M0 243c74 51 121 120 130 206 8 78-18 146-58 220L0 703V243Z"
            fill="url(#auth-sage-sheen)"
            opacity=".92"
          />
          <path d="M0 0h560v900H0z" fill="url(#auth-room-wash)" />
          <circle cx="392" cy="377" r="52" fill="#e7a52b" />
          <circle cx="392" cy="377" r="42" fill="#efb83c" opacity=".75" />

          <g className="auth-botanical-branch auth-botanical-branch-left">
            <path
              d="M17 860c32-116 70-213 139-307 34-47 66-81 111-115"
              fill="none"
              stroke="#557956"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path d="M60 735c-5-61 13-103 60-135 4 57-12 101-60 135Z" fill="#789a68" />
            <path d="M84 683c37-39 80-53 130-40-33 40-76 54-130 40Z" fill="#a7b987" />
            <path d="M112 606c-8-58 8-101 53-135 8 56-7 100-53 135Z" fill="#6e8d5c" />
            <path d="M145 551c39-34 80-43 126-24-37 35-78 43-126 24Z" fill="#b7c99a" />
            <path d="M174 497c1-48 21-83 61-106 1 47-19 83-61 106Z" fill="#7c9b65" />
          </g>

          <g className="auth-botanical-branch auth-botanical-branch-right">
            <path
              d="M551 845c-26-114-48-185-93-265-20-35-47-67-79-94"
              fill="none"
              stroke="#6f895d"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path d="M518 729c-46-30-68-69-65-120 47 28 69 68 65 120Z" fill="#739160" />
            <path d="M511 680c-44 5-80-10-107-46 45-8 81 8 107 46Z" fill="#b0c18d" />
            <path d="M478 599c-42-19-69-51-76-96 42 18 68 51 76 96Z" fill="#829d69" />
            <path d="M451 551c-43 6-77-8-103-40 42-8 77 5 103 40Z" fill="#c4d0a6" />
          </g>
        </svg>

        <div className="auth-botanical-brand">
          <svg viewBox="0 0 76 76" focusable="false">
            <path d="M22 22a18 18 0 0 1 32 0" fill="none" stroke="#efb52e" strokeWidth="4" />
            <path
              d="M38 5v8M15 14l6 6M61 14l-6 6M8 34h8M60 34h8"
              stroke="#efb52e"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path d="M37 64C18 61 9 48 9 29c14 2 25 10 29 26" fill="#f7f4e8" />
            <path d="M39 64c19-3 28-16 28-35-14 2-25 10-29 26" fill="#d5e0bf" />
            <path d="M38 67c-9-17-7-30 0-40 8 10 9 23 0 40" fill="#9bb078" />
            <path
              d="M14 35c11 6 18 14 24 28M62 35C51 41 44 49 38 63"
              fill="none"
              stroke="#1c5a40"
              strokeWidth="3"
            />
          </svg>
          <div>
            <strong>Garderie Oasis</strong>
            <span>
              Nurturing growth.
              <br />
              Every day.
            </span>
          </div>
        </div>
      </div>

      <svg
        className="auth-botanical-abstract"
        viewBox="0 0 190 900"
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <linearGradient id="auth-abstract-forest" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#315f43" />
            <stop offset="1" stopColor="#769264" />
          </linearGradient>
          <linearGradient id="auth-abstract-sage" x1=".1" y1="0" x2=".9" y2="1">
            <stop offset="0" stopColor="#c9d58e" />
            <stop offset="1" stopColor="#91aa68" />
          </linearGradient>
        </defs>
        <rect width="190" height="900" fill="#fbf6e9" />
        <path d="M0 0h160c22 130-12 232-105 307L0 343V0Z" fill="url(#auth-abstract-forest)" />
        <path d="M0 0h87c47 89 47 183 2 283L0 358V0Z" fill="#8cab6f" opacity=".78" />
        <path
          d="M0 348c82-73 143-184 190-330v204c-33 85-90 163-190 215v-89Z"
          fill="url(#auth-abstract-sage)"
          opacity=".92"
        />
        <circle cx="165" cy="661" r="70" fill="#efb329" />
        <path d="M0 574c92 12 152 75 190 181v145H0V574Z" fill="#b8cb8e" opacity=".93" />
        <path d="M0 690c64 32 116 87 155 166l20 44H0V690Z" fill="#4d7650" />
        <g stroke="#315f43" strokeWidth="4" strokeLinecap="round">
          <path d="M13 870c17-92 57-165 122-220" fill="none" />
          <path d="M47 773c-1-39 12-69 40-89 3 39-10 69-40 89Z" fill="#e2ead0" />
          <path d="M59 743c31-25 62-31 95-18-30 27-62 33-95 18Z" fill="#f4f1de" />
          <path d="M81 690c0-34 13-59 40-76 1 33-12 59-40 76Z" fill="#d9e4c6" />
        </g>
      </svg>
    </div>
  );
}
