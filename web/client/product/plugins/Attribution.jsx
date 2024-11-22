/*
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import PropTypes from 'prop-types';
import src from '../assets/img/logo-regione-toscana.png';
import assign from 'object-assign';
import PropTypes from 'prop-types';

class Attribution extends React.Component {
    static propTypes = {
        src: PropTypes.string,
        href: PropTypes.string,
        label: PropTypes.string,
        height: PropTypes.number,
        style: PropTypes.object
    };

    static defaultProps = {
        src: src,
        height: 30,
        href: 'https://www.geosolutionsgroup.com/',
        label: 'GeoSolutions',
        style: {
            position: "absolute",
            width: "124px",
            left: 0,
            bottom: 0
        }
    };

    render() {
        return null;
    }
}

/**
 * Renders the logo of GeoSolutions in the {@link #plugins.NavMenu|NavMenu}
 * @name Attribution
 * @class
 * @memberof plugins
 * @prop {string} [label='GeoSolutions'] the tooltip for the logo
 * @prop {string} [href='https://www.geosolutionsgroup.com/'] the URL to redirect on click
 * @prop {string} [src] URL of the logo image. By default the GeoSolutions logo.
 * @prop {number} [height] the height of the img tag, default is 30
 * @prop {object} [style] a style object to pass to the img
 */
export default {
    AttributionPlugin: assign(Attribution, {
        NavMenu: {
            tool: (props) => ({
                position: 0,
                label: props.label || 'Regione Toscana',
                href: props.href || 'https://www.regione.toscana.it',
                img: props.src && <img className="customer-logo" src={props.src} height="38" /> || <img className="customer-logo" src={src} height="38" />,
                logo: true
            })
        }
    })
};
