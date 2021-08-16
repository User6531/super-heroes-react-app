import React from 'react';
import './footer.scss';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="footer-copyright">
                    <div className="footer-copyright-item">Cast out a radianite orb that breaks into a slowing field upon impact with the ground.</div>
                    <div className="footer-copyright-item">Heal an ally or yourself to full health over a few seconds.</div>
                    <div className="footer-copyright-item">Target a friendly corpse. After a short delay, revive them with full health.</div>
                </div>
            </div>
        )
    }
}