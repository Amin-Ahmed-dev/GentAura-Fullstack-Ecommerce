import { Helmet } from 'react-helmet-async';

const MetaHelper = ({ title, description }) => {
  return (
    <Helmet>
      {/* Page Title */}
      <title>{`${title} | GentAura Menswear`}</title>
      
      {/* Description */}
      <meta name="description" content={description || "Experience the pinnacle of formal menswear and tailoring."} />
      
      {/* Social Medial Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default MetaHelper;