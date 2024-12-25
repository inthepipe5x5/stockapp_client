import {pluralizeString} from '@/utils/pluralize'

//singular version
const baseResources = ['user', 'product', 'vendor', 'inventory', 'task']
const pluralizedResources = baseResources.map(resource => pluralizeString(resource));
const altResourceTerms = [['profile'], ['item', 'product'], ['vendor', 'vendors', 'retailer'], ['inventory', 'inventories'], ['task', 'tasks']]


const resources = new Map();
for (let i = 0; i < baseResources.length; i++) {
    resources.set([baseResources[i], pluralizedResources[i]]);
    resources.set(pluralizedResources[i], baseResources[i]);
    for (let j = 0; j < altResourceTerms[i].length; j++) {
        resources.set(altResourceTerms[i][j], baseResources[i]);
    }
}


export default resources;