/* eslint-disable no-underscore-dangle, no-console */
if (Meteor.isDesktop) {
    Desktop.sharedCollections = {};

    Desktop.on('collections', 'insert', (event, fetchId, name, document) => {
        console.log('insert', name);
        Desktop.sharedCollections[name].insert(document, (error, id) => {
            console.log(error, id);
            Desktop.respond('collections', 'insert', fetchId, [error, id]);
        });
    });

    Desktop.on('collections', 'remove', (event, fetchId, name, selector) => {
        Desktop.sharedCollections[name].remove(selector, (error, id) => {
            console.log(error, id);
            Desktop.respond('collections', 'remove', fetchId, [error, id]);
        });
    });


    Desktop.on('collections', 'update', (event, fetchId, name, selector, modifier, options) => {
        const args = [selector, modifier];
        if (typeof options === 'object') {
            args.push(options);
        }
        Desktop.sharedCollections[name].update(...args, (error, id) => {
            console.log(error, id);
            Desktop.respond('collections', 'update', fetchId, [error, id]);
        });
    });

    Desktop.shareCollection = function(collection, name) {
        Desktop.sharedCollections[name] = collection;
        Desktop.fetch('collections', 'shareCollection', undefined, name)
            .then(result => {console.log(result);});
    };

}
