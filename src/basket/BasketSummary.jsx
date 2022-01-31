import React from 'react';

import BasketTotal from './BasketTotal';
import BasketContent from './BasketContent';

import "./BasketSummary.css";

function BasketSummary() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [showContent, setShowContent] = React.useState(false);

  const basketSummaryRef = React.useRef(null);

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener('resize', () => {});
    }

  }, [width]);

  React.useEffect(() => {
    const checkIfClickOutside = e => {
      if (basketSummaryRef.current && !basketSummaryRef.current.contains(e.target)) {
        setShowContent(false);
      }
    }

    document.addEventListener('click', checkIfClickOutside);

    return () => {
      document.removeEventListener('click', checkIfClickOutside);
    }
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = showContent ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    }

  }, [showContent]);

  let content = (
    <div className="basket-summary" ref={basketSummaryRef}>
      <BasketTotal
        className={
          showContent ? 'open' : ''
        }
        onClick={() => setShowContent(!showContent)}
      />

      {showContent && <BasketContent />}
    </div>
  )

  const renderContent = () => {
    return width < 768 ? null : content;
  }

  return (
    <>
      {renderContent()}

      {showContent && (
        <div className="overlay"></div>
      )}
    </>

  );
}

export default BasketSummary;
