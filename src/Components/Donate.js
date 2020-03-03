import React, {useState, useEffect} from 'react';

export default function Donate({user}) {

  return (
  <div className="text-white h-100" style={{backgroundColor: "#282c34", marginTop: "100px"}}>
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input type="hidden" name="hosted_button_id" value="JDRU9PEQU2CUC" />
      <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
      <img alt="" border="0" src="https://www.paypal.com/en_LT/i/scr/pixel.gif" width="1" height="1" />
    </form>
  </div>
  );
}
