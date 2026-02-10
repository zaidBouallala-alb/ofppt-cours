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
        queryFn: getYears,
    }),
    formations: (yearId) => queryOptions({
        queryKey: ['formations', yearId],
        queryFn: () => getFormations(yearId),
        enabled: !!yearId,
    }),
    modules: (formationId) => queryOptions({
        queryKey: ['modules', formationId],
        queryFn: () => getModules(formationId),
        enabled: !!formationId,
    }),
    courses: (moduleId) => queryOptions({
        queryKey: ['courses', moduleId],
        queryFn: () => getCourses(moduleId),
        enabled: !!moduleId,
    }),
    controls: (moduleId) => queryOptions({
        queryKey: ['controls', moduleId],
        queryFn: () => getControls(moduleId),
        enabled: !!moduleId,
    }),
    efms: (moduleId) => queryOptions({
        queryKey: ['efms', moduleId],
        queryFn: () => getEfms(moduleId),
        enabled: !!moduleId,
    }),
    effs: (formationId) => queryOptions({
        queryKey: ['effs', formationId],
        queryFn: () => getEffs(formationId),
        enabled: !!formationId,
    }),
};
