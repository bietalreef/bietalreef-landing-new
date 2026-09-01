export default function PressVisualUpgrade({ children }) {
  return (
    <div className="press-visual-upgrade">
      {children}
      <style jsx global>{`
        /* First press image only */
        .press-visual-upgrade div:has(> img[src="/images/bietalreef-option-one-villa.webp"]) {
          display: block !important;
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .press-visual-upgrade div:has(> img[src="/images/bietalreef-option-one-villa.webp"]) > img {
          display: none !important;
        }

        .press-visual-upgrade div:has(> img[src="/images/bietalreef-option-one-villa.webp"])::before {
          content: "";
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 1.55rem;
          background: url('/images/press-image-01.webp') center / cover no-repeat;
        }

        /* Last press image only */
        .press-visual-upgrade main > section:last-of-type > div {
          min-height: 520px;
          background-image:
            linear-gradient(90deg, rgba(4, 25, 46, .42), rgba(11, 49, 87, .34)),
            url('/images/press-image-04.webp') !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
          background-size: cover !important;
        }

        @media (max-width: 767px) {
          .press-visual-upgrade div:has(> img[src="/images/bietalreef-option-one-villa.webp"]) {
            padding: 6px !important;
            border-radius: 1.45rem !important;
          }

          .press-visual-upgrade div:has(> img[src="/images/bietalreef-option-one-villa.webp"])::before {
            aspect-ratio: 1.72 / 1;
            border-radius: 1.2rem;
          }

          .press-visual-upgrade main > section:last-of-type > div {
            min-height: 620px;
            background-image:
              linear-gradient(180deg, rgba(4, 25, 46, .28), rgba(11, 49, 87, .48)),
              url('/images/press-image-04.webp') !important;
            background-position: center top !important;
          }
        }
      `}</style>
    </div>
  );
}
