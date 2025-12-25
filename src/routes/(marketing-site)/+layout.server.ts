import type { ConfigurationStoryblok } from '$types/bloks';
import type { ISbStoryData } from '@storyblok/js';
import {
  fetchConfiguration,
  fetchAwards,
  fetchAwardsTypes,
  fetchCareers,
  fetchHomeBlogPosts,
  fetchTeamMembers
} from '$lib/content';

export const load = async ({ locals, fetch }) => {
  const version = locals.version;

  const configRes = await fetchConfiguration({ version, fetch });

  return {
    configuration: configRes.data.story as ISbStoryData<ConfigurationStoryblok>,
    careers: await fetchCareers({ version, fetch }),
    awards: await fetchAwards({ version, fetch }),
    awardsTypes: await fetchAwardsTypes({ version, fetch }),
    teamMembers: await fetchTeamMembers({ version, fetch }),
    homePosts: await fetchHomeBlogPosts({ version, fetch }),
    version
  };
};
