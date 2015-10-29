import React from 'react';
import Link from 'react-router/lib/components/Link';
import responsiveStyles from '../utils/responsiveStyles';
import assign from '../utils/ObjectAssignDeep';

var controllerStyles = {
  default: {
    logo: {
        maxHeight: '3em',
        minWidth: '75px',
        verticalAlign: 'middle',
        height: '100%'
    },
    logoLarge:{
      display : 'block',
      margin : '100px auto',
      maxHeight: 'initial',
      width : '256px',
      height : '256px'
    },
    tagLine: {
        display: 'block'
    },
    link: {
      backgroundColor: 'transparent',
      textAlign: 'center'
    },
    text: {
      fill: '#000',
    }
  },
  '(max-width: 500px)' : {
    logo: {
      marginRight: '-120px',
      marginLeft: '10px'
    },
    text: {
      display: 'none',
      opacity: 0
    }
  }
};

export default class LogoSVG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responsiveStyles : controllerStyles['default']
    };
  }

  componentDidMount() {
    responsiveStyles.addListeners(this, controllerStyles);
  }

  componentWillUnmount() {
    responsiveStyles.removeListeners(this);
  }

  render() {
    let styles = this.state.responsiveStyles;
    let optStyles = assign({}, styles);
    let viewBox = "0 0 782.335 219"
    let logoStyles = styles.logo;
    if (this.props.iconOnly) optStyles.text.display = 'none'
    if (this.props.large) {
      viewBox = "0 0 219 219"
      logoStyles = styles.logoLarge;
    }
    styles = assign({}, optStyles)
    return (
      <Link to="/" style={styles.link} data-component='logoSVG' title="Lantern Homepage">
      <svg style={logoStyles} viewBox={viewBox}>
      <g id="logo">
        <circle fill="#FFFFFF" stroke="#000000" strokeWidth="7" strokeMiterlimit="10" cx="109.5" cy="109.5" r="106"/>
        <g>
          <path d="M158.569,59.045v-7.129c0-2.896-2.357-5.251-5.253-5.251h-3.825v-7.505c0-2.896-2.357-5.251-5.253-5.251h-24.476
            c3.193-2.784,5.219-6.869,5.219-11.423c0-8.367-6.806-15.172-15.172-15.172c-8.364,0-15.172,6.808-15.172,15.172
            c0,4.555,2.03,8.642,5.219,11.423H76.286c-2.896,0-5.254,2.355-5.254,5.251v7.505h-3.825c-2.896,0-5.253,2.355-5.253,5.251v7.129
            c0,2.896,2.357,5.251,5.253,5.251h4.758c-0.007,10.251-0.028,55.769-0.028,55.769c0,8.719,6.838,15.854,15.435,16.37v5.637h-0.104
            c-8.451,0-15.33,6.877-15.33,15.33v27.467h-4.73c-2.896,0-5.253,2.355-5.253,5.252v7.129c0,2.895,2.357,5.25,5.253,5.25h86.111
            c2.896,0,5.254-2.355,5.254-5.25v-7.129c0-2.896-2.357-5.252-5.254-5.252h-4.734v-27.467c0-8.453-6.877-15.33-15.328-15.33h-0.106
            v-5.637c8.596-0.514,15.434-7.648,15.434-16.37c0,0-0.021-45.515-0.028-55.769h4.76C156.214,64.296,158.569,61.941,158.569,59.045
            z M109.808,12.233c5.652,0,10.248,4.6,10.248,10.25c0,5.65-4.596,10.248-10.248,10.248c-5.65,0-10.248-4.6-10.248-10.248
            C99.56,16.833,104.158,12.233,109.808,12.233z M75.955,39.159c0-0.175,0.154-0.328,0.329-0.328h67.956
            c0.175,0,0.329,0.153,0.329,0.328v7.128c0,0.176-0.154,0.329-0.329,0.329H76.286c-0.175,0-0.329-0.153-0.329-0.329v-7.128H75.955z
             M153.647,190.12v7.129c0,0.176-0.151,0.328-0.329,0.328H67.207c-0.175,0-0.329-0.152-0.329-0.328v-7.129
            c0-0.176,0.154-0.328,0.329-0.328h86.111C153.496,189.792,153.647,189.944,153.647,190.12z M133.256,146.993
            c5.736,0,10.405,4.668,10.405,10.408v27.34H76.862v-27.34c0-5.738,4.669-10.408,10.408-10.408h0.104h45.776H133.256z
             M92.296,142.071v-5.334h35.932v5.334H92.296z M143.661,120.064c0,6.338-5.158,11.497-11.497,11.497h-20.672v-7.247
            c6.267-0.494,11.217-5.737,11.217-12.127c0-7.189-10.546-21.274-10.997-21.87l-1.18-1.567l-1.18,1.567
            c-0.448,0.595-10.992,14.681-10.992,21.87c0,6.031,4.414,11.041,10.178,11.997v7.377H88.358c-6.338,0-11.497-5.156-11.497-11.497
            c0,0,0.02-45.452,0.028-55.685h66.744C143.642,74.613,143.661,120.064,143.661,120.064z M110.533,121.407
            c-5.083,0-9.217-4.137-9.217-9.22c0-4.55,5.857-13.745,9.217-18.476c3.362,4.732,9.224,13.925,9.224,18.476
            C119.757,117.27,115.62,121.407,110.533,121.407z M66.878,59.045v-7.129c0-0.175,0.154-0.329,0.329-0.329h86.111
            c0.178,0,0.329,0.154,0.329,0.329v7.129c0,0.175-0.151,0.328-0.329,0.328H67.207C67.032,59.373,66.878,59.22,66.878,59.045z"/>
          <circle cx="109.769" cy="168.754" r="5.908"/>
          <path d="M136.357,69.796c-0.816,0-1.478,0.66-1.478,1.476v35.447c0,0.816,0.662,1.478,1.478,1.478
            c0.814,0,1.477-0.662,1.477-1.478V71.272C137.832,70.456,137.171,69.796,136.357,69.796z"/>
          <path d="M130.119,69.796c-0.814,0-1.477,0.66-1.477,1.476V84.73c0,0.814,0.663,1.477,1.477,1.477c0.816,0,1.479-0.663,1.479-1.477
            V71.272C131.595,70.456,130.935,69.796,130.119,69.796z"/>
        </g>
      </g>
      <g id="text" style={styles.text} >
        <path d="M247.507,159.95V46.596h8.142v106.01h67.693v7.344H247.507z"/>
        <path d="M359.741,161.545c-3.832,0-7.424-0.666-10.776-1.996c-3.353-1.328-6.281-3.137-8.781-5.428
          c-2.502-2.287-4.445-5.002-5.828-8.143c-1.384-3.138-2.075-6.518-2.075-10.137c0-3.617,0.851-6.917,2.554-9.898
          c1.702-2.979,4.096-5.561,7.185-7.743c3.086-2.18,6.73-3.884,10.936-5.109c4.204-1.222,8.861-1.836,13.97-1.836
          c4.47,0,8.993,0.399,13.57,1.197c4.575,0.798,8.674,1.891,12.293,3.273v-8.142c0-7.875-2.235-14.129-6.706-18.759
          s-10.537-6.945-18.2-6.945c-4.151,0-8.489,0.853-13.012,2.554c-4.525,1.704-9.075,4.151-13.65,7.344l-3.193-5.428
          c10.749-7.237,20.859-10.856,30.334-10.856c10.003,0,17.906,2.901,23.708,8.701c5.8,5.802,8.701,13.81,8.701,24.027v40.552
          c0,2.662,1.117,3.99,3.353,3.99v7.186c-0.534,0.104-1.038,0.158-1.517,0.158s-0.934,0-1.357,0c-1.916,0-3.672-0.662-5.268-1.994
          c-1.597-1.33-2.395-3.059-2.395-5.189v-6.865c-3.832,5.004-8.701,8.836-14.608,11.496
          C373.072,160.213,366.658,161.545,359.741,161.545z M361.337,155.159c6.171,0,11.867-1.141,17.083-3.432
          c5.213-2.287,9.1-5.4,11.654-9.339c1.809-2.128,2.714-4.256,2.714-6.386v-14.688c-8.09-2.979-16.392-4.47-24.906-4.47
          c-8.302,0-15.007,1.704-20.116,5.109c-5.109,3.407-7.664,7.877-7.664,13.411c0,2.769,0.532,5.376,1.597,7.823
          c1.062,2.45,2.554,4.549,4.47,6.307c1.916,1.756,4.176,3.141,6.785,4.15C355.562,154.655,358.356,155.159,361.337,155.159z"/>
        <path d="M493.049,159.95h-7.982v-46.3c0-10.749-1.518-18.572-4.551-23.469c-3.033-4.895-7.902-7.344-14.607-7.344
          c-3.514,0-7,0.638-10.459,1.916s-6.652,3.088-9.578,5.428c-2.928,2.342-5.508,5.084-7.744,8.222
          c-2.234,3.141-3.885,6.521-4.949,10.138v51.409h-7.982V76.93h7.346v19.797c1.701-3.193,3.83-6.092,6.385-8.701
          c2.555-2.607,5.373-4.842,8.463-6.706c3.084-1.861,6.41-3.298,9.977-4.311c3.566-1.01,7.211-1.517,10.938-1.517
          c9.045,0,15.432,3.168,19.158,9.5c3.725,6.333,5.588,15.406,5.588,27.221V159.95z"/>
        <path d="M553.396,155.958c-0.426,0.215-1.145,0.613-2.155,1.197c-1.013,0.586-2.29,1.146-3.831,1.678
          c-1.544,0.533-3.273,1.012-5.188,1.436c-1.916,0.424-3.991,0.639-6.227,0.639s-4.338-0.318-6.307-0.957
          c-1.971-0.639-3.699-1.598-5.188-2.875c-1.492-1.277-2.689-2.818-3.592-4.629c-0.906-1.809-1.357-3.938-1.357-6.387V83.476h-11.654
          V76.93h11.654V48.512h7.982V76.93h19.478v6.545h-19.478v60.668c0,3.087,1.062,5.404,3.193,6.945
          c2.128,1.545,4.575,2.314,7.344,2.314c3.298,0,6.146-0.559,8.541-1.676c2.396-1.117,3.857-1.836,4.391-2.154L553.396,155.958z"/>
        <path d="M602.25,161.545c-5.855,0-11.283-1.145-16.285-3.432c-5.004-2.287-9.339-5.43-13.012-9.42
          c-3.672-3.99-6.545-8.594-8.621-13.81c-2.075-5.213-3.113-10.801-3.113-16.764c0-5.852,1.038-11.36,3.113-16.524
          c2.076-5.161,4.922-9.684,8.542-13.57c3.617-3.884,7.928-6.945,12.932-9.18c5.001-2.235,10.377-3.353,16.125-3.353
          c5.852,0,11.255,1.145,16.204,3.433c4.949,2.29,9.232,5.375,12.853,9.26c3.617,3.887,6.466,8.409,8.541,13.57
          c2.075,5.164,3.113,10.617,3.113,16.364c0,0.534-0.027,1.198-0.08,1.996c-0.055,0.798-0.079,1.304-0.079,1.517h-72.962
          c0.319,4.79,1.438,9.235,3.354,13.331c1.915,4.098,4.335,7.638,7.264,10.617c2.927,2.98,6.307,5.324,10.138,7.025
          c3.832,1.703,7.928,2.553,12.294,2.553c2.873,0,5.72-0.398,8.541-1.197c2.819-0.797,5.428-1.887,7.823-3.271
          c2.395-1.383,4.522-3.059,6.386-5.029c1.861-1.969,3.325-4.124,4.391-6.466l7.024,1.916c-1.277,2.981-3.061,5.722-5.349,8.222
          c-2.289,2.502-4.949,4.656-7.982,6.465c-3.033,1.812-6.361,3.221-9.978,4.232C609.806,161.04,606.081,161.545,602.25,161.545z
           M634.818,115.247c-0.319-4.895-1.411-9.365-3.272-13.411c-1.863-4.044-4.258-7.529-7.185-10.458
          c-2.929-2.926-6.306-5.213-10.138-6.865c-3.832-1.649-7.931-2.475-12.293-2.475c-4.366,0-8.462,0.826-12.294,2.475
          c-3.831,1.651-7.211,3.939-10.138,6.865c-2.929,2.929-5.269,6.441-7.024,10.537c-1.756,4.099-2.794,8.542-3.113,13.331H634.818z"/>
        <path d="M699.317,84.114c-7.559,0.215-14.104,2.422-19.637,6.625c-5.536,4.206-9.42,9.979-11.655,17.322v51.888h-7.982V76.93h7.504
          v20.436c2.874-5.853,6.678-10.617,11.415-14.289c4.734-3.672,9.818-5.772,15.247-6.306c1.062,0,2.021-0.025,2.874-0.08
          c0.851-0.052,1.596-0.08,2.234-0.08V84.114z"/>
        <path d="M782.335,159.95h-7.982v-46.3c0-10.749-1.517-18.572-4.551-23.469c-3.033-4.895-7.902-7.344-14.607-7.344
          c-3.513,0-7,0.638-10.458,1.916c-3.46,1.277-6.652,3.088-9.579,5.428c-2.928,2.342-5.508,5.084-7.743,8.222
          c-2.234,3.141-3.886,6.521-4.949,10.138v51.409h-7.982V76.93h7.345v19.797c1.701-3.193,3.831-6.092,6.386-8.701
          c2.555-2.607,5.373-4.842,8.462-6.706c3.085-1.861,6.41-3.298,9.978-4.311c3.565-1.01,7.21-1.517,10.937-1.517
          c9.045,0,15.432,3.168,19.158,9.5c3.725,6.333,5.588,15.406,5.588,27.221V159.95z"/>
      </g>
      </svg>

      </Link>
    );
  }
}
