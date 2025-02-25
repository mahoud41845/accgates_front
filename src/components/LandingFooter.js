import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LandingFooter(props) {
  return (
    <>
      <div className="landingFooter">
        <table className="landingFooterTable">
          <thead>
            <tr className="landingFooterTablehead">
              <th>IB Gates</th>
              <th>Links</th>
              <th>We Accept</th>
              <th>Contact Us</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="landingFooterTablecontent">
                International Business Gates
              </td>
              <td className="landingFooterTablecontent">
                Terms and Conditions
              </td>
              <td className="landingFooterTablecontent">
                <FontAwesomeIcon icon={faUser} className="footericon" />
              </td>
              <td className="landingFooterTablecontent">
                <FontAwesomeIcon icon={faEnvelope} /> info@ibgates.com
              </td>
            </tr>

            <tr>
              <td className="landingFooterTablecontent">
                International Business 2020-2024 Gates©
              </td>
              <td className="landingFooterTablecontent">Pricacy Policy</td>
              <td className="landingFooterTablecontent"></td>
              <td className="landingFooterTablecontent">
                {" "}
                <FontAwesomeIcon icon={faPhone} /> +1 339 399 0570
              </td>
            </tr>

            <tr>
              <td className="landingFooterTablecontent"></td>
              <td className="landingFooterTablecontent">Reveision Policy</td>
              <td className="landingFooterTablecontent"></td>
              <td className="landingFooterTablecontent">
                {" "}
                <FontAwesomeIcon icon={faPhone} /> +20 15 0877 0072
              </td>
            </tr>

            <tr>
              <td className="landingFooterTablecontent"></td>
              <td className="landingFooterTablecontent"></td>
              <td className="landingFooterTablecontent"></td>
              <td className="landingFooterTablecontent">
                {" "}
                <FontAwesomeIcon icon={faPhone} /> +1 339 399 0570
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default LandingFooter;
