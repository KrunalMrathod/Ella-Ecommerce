import "./Footer.css";
import { FaFacebook, FaInstagram, FaPinterest, FaYoutube, FaPlus, FaMinus } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";

const Footer = () => {
  const [mobileFooter, setMobileFooter] = useState<boolean>(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1026) {
        setMobileFooter(false);
      } else {
        setMobileFooter(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileFooter]);

  const toggleSection = (section: string) => {
    setExpandedSection((prevSection) => (prevSection === section ? null : section));
  };

  return (
    <div className="FooterMain">
      {mobileFooter ? (
        <>
          <div className="FooterLeft">
            <div className="FooterColums">
              <h3>SHOP</h3>
              <p>new in</p>
              <p>women</p>
              <p>men</p>
              <p>shoes</p>
              <p>bags & accessories</p>
              <p>top brands</p>
              <p>sale & special offers</p>
            </div>
            <div className="FooterColums">
              <h3>information</h3>
              <p>about</p>
              <p>blog</p>
            </div>
            <div className="FooterColums">
              <h3> customer service </h3>
              <p>search terms</p>
              <p>advance search</p>
              <p>orders and returns</p>
              <p>contact us</p>
              <p>theme FAQs</p>
              <p>consultant</p>
              <p>store locations</p>
            </div>

            <div className="CopiRight">
              <span>
                © 2024, Ella Demo. All Rights Reserved. Themes By Halothemes
              </span>
            </div>
          </div>
          <div className="FooterRight">
            <div className="RightInput">
              <span>newsletter sign up</span>
              <p>
                Sign up for exclusive updates, new arrivals & insider only
                discounts
              </p>
              <div className="RightInputButton">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter Your Email Address.."
                />
                <button>submit</button>
              </div>
            </div>
            <div className="RightSocialIcons">
              <div className="FooterIcons">
                <FaFacebook />
              </div>
              <div className="FooterIcons">
                <FaInstagram />
              </div>
              <div className="FooterIcons">
                <FaPinterest />
              </div>
              <div className="FooterIcons">
                <FaSquareXTwitter />
              </div>
              <div className="FooterIcons">
                <FaYoutube />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="DropLists">
          <div className={`Lists ${expandedSection === 'shop' ? 'expanded' : ''}`} onClick={() => toggleSection('shop')}>
            <span>shop</span>
            <span>{expandedSection === 'shop' ? <FaMinus /> : <FaPlus />}</span>
            {expandedSection === 'shop' && (
              <div className="HiddenList">
                <p>new in</p>
                <p>women</p>
                <p>men</p>
                <p>shoes</p>
                <p>bags & accessories</p>
                <p>top brands</p>
                <p>sale & special offers</p>
              </div>
            )}
          </div>
          <div className={`Lists ${expandedSection === 'information' ? 'expanded' : ''}`} onClick={() => toggleSection('information')}>
            <span>information</span>
            <span>{expandedSection === 'information' ? <FaMinus /> : <FaPlus />}</span>
            {expandedSection === 'information' && (
              <div className="HiddenList">
                <p>about</p>
                <p>blog</p>
              </div>
            )}
          </div>
          <div className={`Lists ${expandedSection === 'customerService' ? 'expanded' : ''}`} onClick={() => toggleSection('customerService')}>
            <span>customer service</span>
            <span>{expandedSection === 'customerService' ? <FaMinus /> : <FaPlus />}</span>
            {expandedSection === 'customerService' && (
              <div className="HiddenList">
                <p>search terms</p>
                <p>advance search</p>
                <p>orders and returns</p>
                <p>contact us</p>
                <p>theme FAQs</p>
                <p>consultant</p>
                <p>store locations</p>
              </div>
            )}
          </div>
          <div className="RightInput">
              <span>newsletter sign up</span>
              <p>
                Sign up for exclusive updates, new arrivals & insider only
                discounts
              </p>
              <div className="RightInputButton">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter Your Email Address.."
                />
                <button>submit</button>
              </div>
            </div>
            <div className="RightSocialIcons">
              <div className="FooterIcons">
                <FaFacebook />
              </div>
              <div className="FooterIcons">
                <FaInstagram />
              </div>
              <div className="FooterIcons">
                <FaPinterest />
              </div>
              <div className="FooterIcons">
                <FaSquareXTwitter />
              </div>
              <div className="FooterIcons">
                <FaYoutube />
              </div>
            </div>
        </div>
        
      )}
      
    </div>
  );
};

export default Footer;
