class BaseComponent extends HTMLElement {

    static polyFill (url) {
        if (!__flags.isWCSupported) {
            const existingScript = document.querySelector('script[data-is-slim-polyfill="true"]')
            if (!existingScript) {
                const script = document.createElement('script')
                script.setAttribute('data-is-slim-polyfill', 'true')
                script.src = url
                document.head.appendChild(script)
            }
        }
    }

    // Native DOM Api V1

    createdCallback () {

    }

    // Native DOM Api V2

    connectedCallback () {

    }

    disconnectedCallback () {

    }

    attributeChangedCallback(attr, oldValue, newValue) {

    }

    // Slim internal API

}

export default BaseComponent