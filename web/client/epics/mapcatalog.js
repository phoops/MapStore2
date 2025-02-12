/**
 * Copyright 2020, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Rx from 'rxjs';

import { basicSuccess, basicError } from '../utils/NotificationUtils';
import { deleteResource, updateResource } from '../api/persistence';

import {
    DELETE_MAP,
    SAVE_MAP,
    setFilterReloadDelay,
    triggerReload
} from '../actions/mapcatalog';
import {SET_CONTROL_PROPERTY, TOGGLE_CONTROL} from "../actions/controls";
import {isActiveSelector} from "../selectors/mapcatalog";
import {closeFeatureGrid} from "../actions/featuregrid";
import {hideMapinfoMarker, purgeMapInfoResults} from "../actions/mapInfo";

// the delay in epics below is needed to temporarily mitigate georchestra backend issues

export const deleteMapEpic = (action$) => action$
    .ofType(DELETE_MAP)
    .switchMap(({resource}) =>
        deleteResource(resource)
            .switchMap(() =>
                Rx.Observable.of(basicSuccess({
                    title: 'mapCatalog.deletedMap.title',
                    message: 'mapCatalog.deletedMap.message',
                    autoDismiss: 6,
                    position: 'tc'
                }), setFilterReloadDelay(700), triggerReload())
            )
            .catch(() => Rx.Observable.of(basicError({
                message: 'mapCatalog.deleteError'
            })))
    );

export const saveMapEpic = (action$) => action$
    .ofType(SAVE_MAP)
    .switchMap(({resource}) =>
        updateResource(resource)
            .switchMap(() =>
                Rx.Observable.of(basicSuccess({
                    title: 'mapCatalog.updatedMap.title',
                    message: 'mapCatalog.updatedMap.message',
                    autoDismiss: 6,
                    position: 'tc'
                }), setFilterReloadDelay(700), triggerReload())
            )
            .catch(() => Rx.Observable.of(basicError({
                message: 'mapCatalog.updateError'
            })))
    );

export const openMapCatalogEpic = (action$, store) =>
    action$.ofType(SET_CONTROL_PROPERTY, TOGGLE_CONTROL)
        .filter((action) => action.control === "mapCatalog" && isActiveSelector(store.getState()))
        .switchMap(() => {
            return Rx.Observable.of(closeFeatureGrid(), purgeMapInfoResults(), hideMapinfoMarker());
        });

