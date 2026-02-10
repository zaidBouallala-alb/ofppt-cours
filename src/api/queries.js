import { queryOptions } from '@tanstack/react-query';
import {
    getYears,
    getFormations,
    getModules,
    getCourses,
    getControls,
    getEfms,
    getEffs
} from './educationService';

export const educationQueries = {
    years: () => queryOptions({
        queryKey: ['years'],
        queryFn: ({ signal }) => getYears({ signal }),
    }),
    formations: (yearId) => queryOptions({
        queryKey: ['formations', yearId],
        queryFn: ({ signal }) => getFormations(yearId, { signal }),
        enabled: !!yearId,
    }),
    modules: (formationId) => queryOptions({
        queryKey: ['modules', formationId],
        queryFn: ({ signal }) => getModules(formationId, { signal }),
        enabled: !!formationId,
    }),
    courses: (moduleId) => queryOptions({
        queryKey: ['courses', moduleId],
        queryFn: ({ signal }) => getCourses(moduleId, { signal }),
        enabled: !!moduleId,
    }),
    controls: (moduleId) => queryOptions({
        queryKey: ['controls', moduleId],
        queryFn: ({ signal }) => getControls(moduleId, { signal }),
        enabled: !!moduleId,
    }),
    efms: (moduleId) => queryOptions({
        queryKey: ['efms', moduleId],
        queryFn: ({ signal }) => getEfms(moduleId, { signal }),
        enabled: !!moduleId,
    }),
    effs: (formationId) => queryOptions({
        queryKey: ['effs', formationId],
        queryFn: ({ signal }) => getEffs(formationId, { signal }),
        enabled: !!formationId,
    }),
};
