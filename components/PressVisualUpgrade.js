export default function PressVisualUpgrade({ children }) {
  return (
    <div className="press-visual-upgrade">
      {children}
      <style jsx global>{`
        .press-visual-upgrade div:has(> img[src="/images/bietalreef-option-one-villa.webp"]),
        .press-visual-upgrade div:has(> img[src="/images/gateway/providers-gateway.webp"]),
        .press-visual-upgrade div:has(> img[src="/images/providers-hero.webp"]),
        .press-visual-upgrade div:has(> img[src="/images/services-offers-hero.webp"]),
        .press-visual-upgrade div:has(> img[src="/images/home-premium-hero.svg"]) {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          width: 100%;
          overflow: hidden;
        }

        .press-visual-upgrade div:has(> img[src="/images/bietalreef-option-one-villa.webp"]) > img,
        .press-visual-upgrade div:has(> img[src="/images/gateway/providers-gateway.webp"]) > img,
        .press-visual-upgrade div:has(> img[src="/images/providers-hero.webp"]) > img,
        .press-visual-upgrade div:has(> img[src="/images/services-offers-hero.webp"]) > img,
        .press-visual-upgrade div:has(> img[src="/images/home-premium-hero.svg"]) > img {
          display: none !important;
        }

        .press-visual-upgrade div:has(> img[src="/images/bietalreef-option-one-villa.webp"])::before,
        .press-visual-upgrade div:has(> img[src="/images/bietalreef-option-one-villa.webp"])::after,
        .press-visual-upgrade div:has(> img[src="/images/gateway/providers-gateway.webp"])::before,
        .press-visual-upgrade div:has(> img[src="/images/gateway/providers-gateway.webp"])::after,
        .press-visual-upgrade div:has(> img[src="/images/providers-hero.webp"])::before,
        .press-visual-upgrade div:has(> img[src="/images/providers-hero.webp"])::after,
        .press-visual-upgrade div:has(> img[src="/images/services-offers-hero.webp"])::before,
        .press-visual-upgrade div:has(> img[src="/images/services-offers-hero.webp"])::after,
        .press-visual-upgrade div:has(> img[src="/images/home-premium-hero.svg"])::before,
        .press-visual-upgrade div:has(> img[src="/images/home-premium-hero.svg"])::after {
          content: "";
          display: block;
          min-width: 0;
          min-height: 270px;
          border-radius: 1.25rem;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }

        .press-visual-upgrade div:has(> img[src="/images/bietalreef-option-one-villa.webp"])::before {
          background-image: url('/images/press-image-01.webp');
        }
        .press-visual-upgrade div:has(> img[src="/images/bietalreef-option-one-villa.webp"])::after {
          background-image: url('/images/press-image-02.webp');
        }

        .press-visual-upgrade div:has(> img[src="/images/gateway/providers-gateway.webp"])::before {
          background-image: url('/images/press-image-07.webp');
        }
        .press-visual-upgrade div:has(> img[src="/images/gateway/providers-gateway.webp"])::after {
          background-image: url('/images/press-image-08.webp');
        }

        .press-visual-upgrade div:has(> img[src="/images/providers-hero.webp"])::before {
          background-image: url('/images/press-image-09.webp');
        }
        .press-visual-upgrade div:has(> img[src="/images/providers-hero.webp"])::after {
          background-image: url('/images/press-image-10.webp');
        }

        .press-visual-upgrade div:has(> img[src="/images/services-offers-hero.webp"])::before {
          background-image: url('/images/press-image-11.webp');
        }
        .press-visual-upgrade div:has(> img[src="/images/services-offers-hero.webp"])::after {
          background-image: url('/images/press-image-13.webp');
        }

        .press-visual-upgrade div:has(> img[src="/images/home-premium-hero.svg"])::before {
          background-image: url('/images/press-image-03.webp');
        }
        .press-visual-upgrade div:has(> img[src="/images/home-premium-hero.svg"])::after {
          background-image: url('/images/press-image-06.webp');
        }

        .press-visual-upgrade #weyaak > div:last-child {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(0, .74fr) minmax(0, 1.26fr);
          align-items: center;
          gap: 16px;
        }
        .press-visual-upgrade #weyaak > div:last-child::before {
          content: "";
          display: block;
          min-height: 290px;
          border-radius: 1.4rem;
          background: url('/images/press-image-12.webp') center / contain no-repeat;
        }

        .press-visual-upgrade main > section:first-of-type > div.relative > div:last-child > div:last-child::after {
          content: "";
          position: absolute;
          width: 72px;
          height: 50px;
          right: 18px;
          bottom: 18px;
          border-radius: 14px;
          background: rgba(255,255,255,.94) url('/images/press-image-05.webp') center / contain no-repeat;
          box-shadow: 0 12px 30px rgba(0,0,0,.18);
          pointer-events: none;
        }
        .press-visual-upgrade main > section:first-of-type > div.relative > div:last-child > div:last-child {
          position: relative;
        }

        .press-visual-upgrade main > section:last-of-type > div {
          background-image:
            linear-gradient(90deg, rgba(4,25,46,.94), rgba(11,49,87,.88)),
            url('/images/press-image-04.webp') !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
          background-size: cover !important;
        }

        @media (max-width: 767px) {
          .press-visual-upgrade div:has(> img[src="/images/bietalreef-option-one-villa.webp"]),
          .press-visual-upgrade div:has(> img[src="/images/gateway/providers-gateway.webp"]),
          .press-visual-upgrade div:has(> img[src="/images/providers-hero.webp"]),
          .press-visual-upgrade div:has(> img[src="/images/services-offers-hero.webp"]),
          .press-visual-upgrade div:has(> img[src="/images/home-premium-hero.svg"]) {
            gap: 6px;
            padding: 6px !important;
            border-radius: 1.45rem !important;
          }

          .press-visual-upgrade div:has(> img[src="/images/bietalreef-option-one-villa.webp"])::before,
          .press-visual-upgrade div:has(> img[src="/images/bietalreef-option-one-villa.webp"])::after {
            min-height: 128px;
          }

          .press-visual-upgrade div:has(> img[src="/images/gateway/providers-gateway.webp"])::before,
          .press-visual-upgrade div:has(> img[src="/images/gateway/providers-gateway.webp"])::after,
          .press-visual-upgrade div:has(> img[src="/images/providers-hero.webp"])::before,
          .press-visual-upgrade div:has(> img[src="/images/providers-hero.webp"])::after,
          .press-visual-upgrade div:has(> img[src="/images/services-offers-hero.webp"])::before,
          .press-visual-upgrade div:has(> img[src="/images/services-offers-hero.webp"])::after,
          .press-visual-upgrade div:has(> img[src="/images/home-premium-hero.svg"])::before,
          .press-visual-upgrade div:has(> img[src="/images/home-premium-hero.svg"])::after {
            min-height: 315px;
          }

          .press-visual-upgrade #weyaak > div:last-child {
            grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
            gap: 10px;
            padding: 12px;
          }
          .press-visual-upgrade #weyaak > div:last-child::before {
            min-height: 310px;
          }

          .press-visual-upgrade main > section:first-of-type > div.relative > div:last-child > div:last-child::after {
            width: 58px;
            height: 40px;
            right: 12px;
            bottom: 12px;
          }
        }
      `}</style>
    </div>
  );
}
