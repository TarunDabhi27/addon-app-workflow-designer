//polymer
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

// ui-platform-utils
import { ObjectUtils } from '@riversandtechnologies/ui-platform-utils/lib/common/ObjectUtils.js';

// ui-platform-elements
import '@riversandtechnologies/ui-platform-elements/lib/elements/pebble-textbox/pebble-textbox.js';

// ui-platform-dataaccess
import { ConfigurationManager } from '@riversandtechnologies/ui-platform-dataaccess/lib/managers/ConfigurationManager.js';

// ui-platform-business-elements
import '@riversandtechnologies/ui-platform-business-elements/lib/elements/rock-attribute/rock-attribute.js';

// Include Styles
import styles from './plugin-hello-world.polymer.css.js';
import sharedStyles from '@riversandtechnologies/ui-platform-elements/lib/flow/styles/flow.polymer.css.js';

class PluginHelloWorld extends PolymerElement {
    static get is() {
        return 'plugin-hello-world';
    }

    static get template() {
        return html` ${sharedStyles} ${styles}
            <br />
            <div>[[message]]</div>

            <h5>Example of textbox</h5>

            <pebble-textbox
                value="Value of textbox">
                label="Textbox"
            </pebble-textbox>
            <br />
            <hr />

            <h5>Example of textarea attribute</h5>

            <rock-attribute
                attribute-model-object="[[textareaAttributeModelObject]]"
                attribute-object="[[textareaAttributeObject]]"
                mode="[[_mode]]"
                on-attribute-mode-changed="_editAttribute">
            </rock-attribute>
            
            <hr />

            <h5>Example of boolean attribute</h5>

            <rock-attribute
                attribute-model-object="[[booleanAttributeModelObject]]"
                attribute-object="[[booleanAttributeObject]]"
                mode="[[_mode]]"
                on-attribute-mode-changed="_editAttribute">
            </rock-attribute>

            `;
    }

    static get properties() {
        return {
            message: {
                type: String,
                value: ''
            },
            textareaAttributeObject: {
                type: Object,
                value: function () {
                    return {};
                }
            },
            textareaAttributeModelObject: {
                type: Object,
                value: function () {
                    return {};
                }
            },
            booleanAttributeObject: {
                type: Object,
                value: function () {
                    return {};
                }
            },
            booleanAttributeModelObject: {
                type: Object,
                value: function () {
                    return {};
                }
            },
            _mode: {
                type: String,
                value: 'view'
            }
        };
    }

    constructor() {
        super();

        //attribute object to load textarea rock-attribute
        this.textareaAttributeObject = {
            value: "Value of textarea attribute",
            referenceDataId: "",
            source: "internal",
            locale: "en-US",
            selfContext: 1,
            name: "textarea-attribute",
            isNullValue: false,
            groupName: "Basic"
        };

        //attribute model object to load textarea rock-attribute
        this.textareaAttributeModelObject = {
            properties: {
                isLocalizable: true,
                dataType: "string",
                displayType: "textarea",
                readPermission: true,
                writePermission: true,
                deletePermission: true,
                hasWritePermission: true,
                externalName: "Textarea Attribute",
                groupName: "Basic"
            },
            selfContext: 1,
            isLocalizable: true,
            dataType: "string",
            displayType: "textarea",
            readPermission: true,
            writePermission: true,
            deletePermission: true,
            hasWritePermission: true,
            externalName: "Textarea Attribute",
            groupName: "Basic",
            name: "textarea-attribute",
            displaySequence: 10
        };

        //attribute object to load boolean rock-attribute
        this.booleanAttributeObject = {
            value: "true",
            referenceDataId: "",
            source: "internal",
            locale: "en-US",
            selfContext: 1,
            name: "boolean-attribute",
            isNullValue: false,
            groupName: "Basic"
        };

        //attribute model object to load boolean rock-attribute
        this.booleanAttributeModelObject = {
            properties: {
                dataType: "boolean",
                displayType: "boolean",
                readPermission: true,
                writePermission: true,
                deletePermission: true,
                hasWritePermission: true,
                externalName: "Boolean Attribute",
                groupName: "Basic",
                isLocalizable: false
            },
            selfContext: 1,
            dataType: "boolean",
            displayType: "boolean",
            readPermission: true,
            writePermission: true,
            deletePermission: true,
            hasWritePermission: true,
            externalName: "Boolean Attribute",
            groupName: "Basic",
            isLocalizable: false,
            trueText: "TRUE",
            falseText: "FALSE",
            name: "boolean-attribute",
            displaySequence: 20
        };
    }

    async connectedCallback() {
        super.connectedCallback();

        let configResponse = await ConfigurationManager.getConfig('plugin-hello-world');

        if (
            ObjectUtils.isValidObjectPath(configResponse, 'response.status') &&
            configResponse.response.status == 'success'
        ) {
            this._handleConfigGetSuccess(configResponse);
        } else {
            this._handleConfigGetError(configResponse);
        }
    }

    _handleConfigGetSuccess(configResponse) {
        let res = configResponse.response.content;
        let compConfig = {};

        if (ObjectUtils.isValidObjectPath(res, 'configObjects.0.data.contexts.0.jsonData')) {
            compConfig = res.configObjects[0].data.contexts[0].jsonData;

            if (ObjectUtils.isEmpty(compConfig)) {
                console.error('UI config is empty', configResponse);
            } else {
                if (compConfig.config) {
                    let config = compConfig.config;

                    if (config.properties) {
                        for (let propKey in config.properties) {
                            this.set(propKey, config.properties[propKey]);
                        }
                    }
                }
            }
        }
    }

    _handleConfigGetError(configResponse) {
        console.error('UI config get failed with error', configResponse);
    }

    _editAttribute(e) {
        if (e && e.detail && e.detail.mode) {
            this._mode = e.detail.mode;
        }
    }
}

customElements.define(PluginHelloWorld.is, PluginHelloWorld);
