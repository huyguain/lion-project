import React from 'react';
class AutoTexarea extends React.Component {
    constructor() {
        super();
        this.state = {
            title: ""
        };
    }
    trackContent = event => {
        let height = this.textArea.offsetHeight;

        if (height < this.textArea.scrollHeight) {
            this.textArea.style.height = this.textArea.scrollHeight + "px";
        }
    }

    render() {
        return (
            <div>
                <textarea
                    ref={(el) => { this.textArea = el }}
                    onChange={e => this.trackContent(e)}
                />
            </div>
        )
    }
}
export default AutoTexarea;