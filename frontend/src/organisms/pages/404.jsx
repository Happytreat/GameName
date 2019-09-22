import React from "react";
import NotFoundImg from '../../asset/404.svg';
import Background from '../../asset/background.jpg';
import HtmlMeta from "../../molecules/HtmlMeta/HtmlMeta";

const styles = {
  paddingTop: '100px',
  textAlign: 'center',
  backgroundImage: `url(${Background})`
};

export default () =>
  <HtmlMeta subtitle={"404"}>
    <div style={styles}>
      <h3>Sorry, page not found!</h3>
      <br />
      <img src={NotFoundImg} alt="404" style={{maxWidth: '30vh'}} />
    </div>
  </HtmlMeta>;
