import type { ISbResult, ISbStoriesParams, ISbStoryData } from '@storyblok/js';
import { getStoryblok, handleStoryblokError } from '$lib/storyblok';
import {
  getPageBySlug,
  getAllBlogPosts,
  getBlogPostBySlug,
  getAllProjects,
  getAllCareers,
  getAllTeamMembers,
  getAllAwards,
  getAllHandbookChapters,
  getConfiguration,
  getHandbookConfiguration
} from '$lib/data-local';
import type {
  BlogPostStoryblok,
  CareerStoryblok,
  PageStoryblok,
  ProjectStoryblok,
  TeamMemberStoryblok,
  LandingPageStoryblok,
  RecognitionStoryblok,
  HandbookStoryblok,
  ConfigurationStoryblok
} from '$types/bloks';
import { HOME_SLUG } from './constants';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export const PAGE_PARAMS = {
  resolve_links: 'url',
  resolve_relations:
    'blog-post.author,blog-post.project,project.team,home-page.small_highlights,home-page.projects,blog-post.authors,hero.small_highlights,work-recognitions.small_highlights,projects.projects,highlights.small_highlights,projects-two-columns.projects'
} as const;

export const BLOG_PARAMS = {
  per_page: 10,
  content_type: 'blog-post',
  sort_by: 'first_published_at:desc',
  resolve_relations: 'blog-post.author,blog-post.authors'
} as const;

export const PROJECT_PARAMS = {
  per_page: 50,
  content_type: 'project'
};

export const CAREERS_PARAMS = {
  per_page: 50,
  content_type: 'career'
};

export const TEAM_MEMBER_PARAMS = {
  per_page: 100,
  content_type: 'team-member'
};

export const AWARDS_PARAMS = {
  per_page: 100,
  content_type: 'recognition-entry',
  resolve_relations: 'recognition-entry.project,recognition-entry.recognition'
};

export const AWARDS_TYPES_PARAMS = {
  per_page: 100,
  content_type: 'recognition-type'
};

/**
 * Determine if we should use local data instead of API calls
 */
export function useLocalData(): boolean {
  return (
    env.USE_LOCAL_DATA === 'true' ||
    env.PUBLIC_STORYBLOK_TOKEN === 'disabled_use_local_data' ||
    !env.PUBLIC_STORYBLOK_TOKEN
  );
}

/**
 * Fetch site configuration (navigation, footer, etc.)
 */
export const fetchConfiguration = async (
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
) => {
  if (useLocalData()) {
    const config = getConfiguration();
    if (!config) throw error(500, 'Configuration not found');
    return { data: { story: config as ISbStoryData<ConfigurationStoryblok> } };
  }

  const storyblok = getStoryblok({ fetch: options.fetch || fetch });
  return await storyblok.get('cdn/stories/configuration', {
    version: options.version || 'published',
    resolve_relations:
      'configuration.primary_navigation,configuration.secondary_navigation,footer-column-internal.links'
  });
};

/**
 * Fetch handbook configuration
 */
export const fetchHandbookConfiguration = async (
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
) => {
  if (useLocalData()) {
    const config = getHandbookConfiguration();
    if (!config) throw error(500, 'Handbook configuration not found');
    return { data: { story: config as ISbStoryData<ConfigurationStoryblok> } };
  }

  const storyblok = getStoryblok({ fetch: options.fetch || fetch });
  return await storyblok.get('cdn/stories/configuration/handbook-navigation', {
    version: options.version || 'published',
    resolve_relations:
      'configuration.primary_navigation,configuration.secondary_navigation,footer-column-internal.links'
  });
};

export const fetchCareers = async (
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
) => {
  if (useLocalData()) {
    return getAllCareers() as ISbStoryData<CareerStoryblok>[];
  }

  const storyblok = getStoryblok({ fetch: options.fetch || fetch });

  const {
    data: { stories }
  } = await storyblok.get('cdn/stories', {
    ...CAREERS_PARAMS,
    version: options.version || 'published'
  });

  return stories as ISbStoryData<CareerStoryblok>[];
};

// awards
export const fetchAwards = async (
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
) => {
  if (useLocalData()) {
    return getAllAwards() as ISbStoryData<RecognitionStoryblok>[];
  }

  const storyblok = getStoryblok({ fetch: options.fetch || fetch });

  const {
    data: { stories }
  } = await storyblok.get('cdn/stories', {
    ...AWARDS_PARAMS,
    version: options.version || 'published'
  });

  return stories as ISbStoryData<RecognitionStoryblok>[];
};

// awards types
export const fetchAwardsTypes = async (
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
) => {
  if (useLocalData()) {
    return getAllAwards() as ISbStoryData<RecognitionStoryblok>[];
  }

  const storyblok = getStoryblok({ fetch: options.fetch || fetch });

  const {
    data: { stories }
  } = await storyblok.get('cdn/stories', {
    ...AWARDS_TYPES_PARAMS,
    version: options.version || 'published'
  });

  return stories as ISbStoryData<RecognitionStoryblok>[];
};

// blog posts use other data from the response, so we need to return the whole response
export const fetchBlogPosts = async (
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch; url?: URL } = {}
) => {
  if (useLocalData()) {
    const posts = getAllBlogPosts();
    return { data: { stories: posts } };
  }

  const storyblok = getStoryblok({ fetch: options.fetch || fetch });

  return storyblok.get('cdn/stories', {
    ...BLOG_PARAMS,
    with_tag: options.url?.searchParams.getAll('t').join(',') || '',
    page: 1,
    version: options.version || 'published',
    filter_query: {
      hide_from_listings: {
        is: false
      }
    }
  });
};

export const fetchHomeBlogPosts = async (
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch; url?: URL } = {}
) => {
  if (useLocalData()) {
    return getAllBlogPosts(3);
  }

  const storyblok = getStoryblok({ fetch: options.fetch || fetch });

  const res = await storyblok.get('cdn/stories', {
    content_type: 'blog-post',
    sort_by: 'first_published_at:desc',
    resolve_relations: 'blog-post.author,blog-post.authors',
    per_page: 3,
    page: 1,
    version: options.version || 'published',
    filter_query: {
      hide_from_listings: {
        is: false
      }
    }
  });

  return res.data.stories;
};

export const fetchTeamMembers = async (
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch; url?: URL } = {}
) => {
  if (useLocalData()) {
    return getAllTeamMembers();
  }

  const storyblok = getStoryblok({ fetch: options.fetch || fetch });

  const res = await storyblok.get('cdn/stories', {
    ...TEAM_MEMBER_PARAMS,
    per_page: 100,
    page: 1,
    filter_query: {
      is_active: {
        is: true
      }
    },
    version: options.version || 'published'
  });

  return res.data.stories;
};

export const fetchProjects = async (
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
) => {
  if (useLocalData()) {
    return getAllProjects() as ISbStoryData<ProjectStoryblok>[];
  }

  const storyblok = getStoryblok({ fetch: options.fetch || fetch });

  const res: { data: { stories: ISbStoryData<ProjectStoryblok>[] } } = await storyblok.get(
    'cdn/stories',
    {
      ...PROJECT_PARAMS,
      version: options.version || 'published'
    }
  );

  return res.data.stories;
};

// Dynamic Pages
export type Page = ISbStoryData<PageStoryblok>;
export type CareerPage = ISbStoryData<CareerStoryblok>;
export type BlogPostPage = ISbStoryData<
  Omit<BlogPostStoryblok, 'author' | 'project'> & {
    author: ISbStoryData<TeamMemberStoryblok>;
    project: ISbStoryData<ProjectStoryblok>;
  }
>;
export type ProjectPage = ISbStoryData<ProjectStoryblok>;
export type TeamMemberPage = ISbStoryData<TeamMemberStoryblok>;
export type LandingPage = ISbStoryData<LandingPageStoryblok>;
export type HandbookPage = ISbStoryData<HandbookStoryblok>;

export type DynamicPage =
  | Page
  | BlogPostPage
  | ProjectPage
  | TeamMemberPage
  | CareerPage
  | LandingPage
  | HandbookPage;

export type PageResult = {
  story: DynamicPage;
  homePosts?: BlogPostPage[];
  blogIndex?: ISbResult;
  projectsIndex?: ISbStoryData<ProjectStoryblok>[];
  relatedPosts?: BlogPostPage[];
  relatedProjects?: ProjectPage[];
  authorPosts?: BlogPostPage[];
  authorProjects?: ProjectPage[];
  teamMembers?: TeamMemberPage[];
};

export async function fetchPage(options: {
  slug: string;
  version?: 'draft' | 'published';
  fetch?: typeof fetch;
  url?: URL;
}): Promise<PageResult> {
  // remove leading slashes. svelte-kit's path params start with no slash, but links will have a leading slash
  const slug = options.slug.replace(/^\/+/, '');

  // If using local data, try to find page locally
  if (useLocalData()) {
    let localStory: DynamicPage | null = null;

    // For root path (empty slug), fetch home page
    if (slug === '' || slug === HOME_SLUG) {
      localStory = (getPageBySlug('') || null) as DynamicPage | null;
    } else {
      // Try to find in pages
      localStory = (getPageBySlug(slug) || null) as DynamicPage | null;

      // Try to find in blog posts
      if (!localStory) {
        localStory = (getBlogPostBySlug(slug) || null) as DynamicPage | null;
      }

      // Try to find in projects
      if (!localStory) {
        localStory = (getAllProjects().find((p) => p.slug === slug) || null) as DynamicPage | null;
      }

      // Try to find in careers
      if (!localStory) {
        localStory = (getAllCareers().find((c) => c.slug === slug) || null) as DynamicPage | null;
      }

      // Try to find in handbook
      if (!localStory) {
        localStory = (getAllHandbookChapters().find((h) => h.slug === slug) ||
          null) as DynamicPage | null;
      }
    }

    if (!localStory) {
      throw error(404, `Page not found: ${slug || '/'}`);
    }

    // Return appropriate data structure based on story type
    if (localStory.content?.component === 'blog-post') {
      return {
        story: localStory,
        relatedPosts: getAllBlogPosts(3) as BlogPostPage[]
      };
    }

    if (localStory.content?.component === 'project') {
      return {
        story: localStory,
        relatedProjects: getAllProjects() as ProjectPage[]
      };
    }

    return { story: localStory };
  }

  // Fallback to Storyblok API
  const storyblok = getStoryblok({ fetch: options.fetch || fetch });

  if (slug === HOME_SLUG) throw error(404);

  let story: ISbResult;
  try {
    story = await storyblok.get(`cdn/stories/${slug || HOME_SLUG}`, {
      version: options.version || 'published',
      ...PAGE_PARAMS
    });
  } catch (err) {
    throw handleStoryblokError(err);
  }

  const { data }: { data: { story?: DynamicPage } } = story;
  if (!data.story?.id) throw error(404, `Storyblok story for ${slug} has no id`);

  // Index pages (blog, projects) have their own route but they need to be able to be rendered in the drawer as well
  if (
    data.story.content.component === 'page' &&
    data.story.content.page.length > 0 &&
    data.story.content.page?.[0].component === 'blog-index'
  ) {
    return {
      story: data.story,
      blogIndex: await fetchBlogPosts(options)
    };
  }

  if (
    data.story.content.component === 'page' &&
    data.story.content.page.length > 0 &&
    data.story.content.page?.[0].component === 'projects-index'
  ) {
    return {
      story: data.story,
      projectsIndex: await fetchProjects(options)
    };
  }

  // home page data
  if (
    data.story.content.component === 'page' &&
    data.story.content.page.length > 0 &&
    data.story.content.page?.[0].component === 'home-page'
  ) {
    return {
      story: data.story,
      homePosts: await fetchEntries<BlogPostPage>(options, {
        ...BLOG_PARAMS,
        per_page: 3,
        page: 1
      })
    };
  }

  // Blog posts need to fetch related posts
  if (data.story.content.component === 'blog-post') {
    return {
      story: data.story,
      relatedPosts: await fetchEntries<BlogPostPage>(options, {
        ...BLOG_PARAMS,
        per_page: 3,
        page: 1,
        excluding_ids: data.story.id.toString(),
        with_tag: data.story.tag_list.join(','),
        filter_query: {
          hide_from_listings: {
            is: false
          }
        }
      })
    };
  }

  // Projects need to fetch related projects
  if (data.story.content.component === 'project') {
    return {
      story: data.story,
      relatedProjects: await fetchEntries<ProjectPage>(options, PROJECT_PARAMS)
    };
  }

  // Team members need to fetch related posts and projects
  if (data.story.content.component === 'team-member') {
    return {
      story: data.story,
      authorPosts: await fetchEntries<BlogPostPage>(options, {
        ...BLOG_PARAMS,
        per_page: 50,
        page: 1,
        filter_query: {
          authors: {
            any_in_array: data.story.uuid
          }
        }
      }),
      authorProjects: await fetchEntries<ProjectPage>(options, {
        ...PROJECT_PARAMS,
        filter_query: {
          team: {
            any_in_array: data.story.uuid
          }
        }
      })
    };
  }

  // Careers canvas needs access to team members in order to fill "Team" component
  if (
    data.story.content.component === 'page' &&
    data.story.content.page.length > 0 &&
    data.story.content.page?.[0].component === 'careers-page'
  ) {
    return {
      story: data.story,
      teamMembers: await fetchEntries<TeamMemberPage>(options, {
        ...TEAM_MEMBER_PARAMS,
        per_page: 100,
        page: 1,
        filter_query: {
          is_active: {
            is: true
          }
        }
      })
    };
  }

  if (data.story.content.component === 'handbook') {
    return { story: data.story };
  }

  return { story: data.story };
}

export async function fetchEntries<T>(
  options: {
    version?: 'draft' | 'published';
    fetch?: typeof fetch;
  },
  params: ISbStoriesParams
): Promise<T[]> {
  try {
    const storyblok = getStoryblok({ fetch: options.fetch || fetch });

    const {
      data: { stories }
    } = await storyblok.get('cdn/stories', {
      version: options.version || 'published',
      excluding_fields: 'body',
      ...params
    });

    return stories;
  } catch (error) {
    console.error('Unknown error fetching entries', error);
    return [];
  }
}
