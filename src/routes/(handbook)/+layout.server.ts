import type { ConfigurationStoryblok } from '$types/bloks';
import type { ISbStoryData } from '@storyblok/js';
import { fetchHandbookConfiguration, fetchCareers } from '$lib/content';

export const load = async ({ fetch, locals }) => {
  const version = locals.version;

  const res = await fetchHandbookConfiguration({ version, fetch });

  return {
    configuration: res.data.story as ISbStoryData<ConfigurationStoryblok>,
    careers: await fetchCareers({ version, fetch }),
    version
  };
};
