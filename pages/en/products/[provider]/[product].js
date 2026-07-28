import ProductDetailPage from '../../../../components/ProductDetailPage';
import {
  getPublishedProductByRoute,
  getPublishedProductsForSitemap,
} from '../../../../lib/platformDirectoryCards';

export default function EnglishProductPage({ product }) {
  return <ProductDetailPage product={product} locale="en" />;
}

export async function getStaticProps({ params }) {
  const product = await getPublishedProductByRoute(
    'en',
    params.provider,
    params.product
  );
  if (!product) return { notFound: true, revalidate: 300 };
  return { props: { product }, revalidate: 300 };
}

export async function getStaticPaths() {
  const products = await getPublishedProductsForSitemap('en');
  return {
    paths: products.map((product) => ({
      params: {
        provider: product.providerSlug,
        product: product.slug,
      },
    })),
    fallback: 'blocking',
  };
}
