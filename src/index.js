import { app } from 'electron';

 /**
 * Settings object.
 * @typedef {Object} PluginSettings
 * @property {boolean} fileName - the name of the json file
 */

/**
 * Implements a simple localstorage replacement for Meteor Desktop.
 *
 * @class
 */
export default class LocalStorage {

    /**
     * @param {Object} log              - Winston logger
     * @param {Object} appSettings      - settings.json object
     * @param {Object} eventsBus        - event emitter for listening or emitting events on the
     *                                    desktop side
     * @param {PluginSettings} settings - plugin settings
     * @param {Object} Module           - reference to Module class
     */
    constructor({ log, appSettings, eventsBus, settings, Module }) {
        this.module = new Module('collections');

        // Get the automatically predefined logger instance.
        this.log = log;
        this.eventsBus = eventsBus;

        this.eventsBus.on('desktopLoaded', () => {
            this.init();
        });

        this.collections = {};
    }

    init() {
        // Do some initialization if necessary.

        this.registerApi();

        // Lets inform that the module has finished loading.
        this.eventsBus.emit('collections.loaded');
    }

    registerApi() {

        this.module.on('wow', (event) => {
            console.log('wow');
            this.collections['test'].insert({ name: 'wowow'});

        });

        this.module.on('shareCollection', (event, fetchId, name) => {
            if (name in this.collections) {
                this.module.respond('shareCollection', fetchId, false);
            } else {
                console.log('created collection', name);
                this.collections[name] = new Collection(this, name);
                this.module.respond('shareCollection', fetchId, true);
            }
        });

    }

    getCollection(name) {
        if (!(name in this.collections)) {
            return null;
        }
        return this.collections[name];
    }
}

class Collection {
    constructor($, name) {
        this.$ = $;
        this.name = name;
    }

    insert(document, callback) {
        console.log('fetch');
        this.$.module.fetch('insert', 2000, this.name, document)
            .then((args) => { console.log('fetch response', args); })
            .catch(console.error);
    }
}
