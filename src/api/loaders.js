import { queryClient } from '../lib/queryClient';
import { educationQueries } from './queries';

// Helper to prefetch without blocking
const prefetch = (query) => {
    queryClient.prefetchQuery(query);
    return null;
};

export const yearsLoader = () => prefetch(educationQueries.years());

export const formationsLoader = ({ params }) => prefetch(educationQueries.formations(params.yearId));

export const modulesLoader = ({ params }) => prefetch(educationQueries.modules(params.formationId));

export const coursesLoader = ({ params }) => prefetch(educationQueries.courses(params.moduleId));

export const effsLoader = ({ params }) => prefetch(educationQueries.effs(params.formationId));

