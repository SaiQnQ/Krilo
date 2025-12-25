/**
 * Local Data Loader
 * Provides a fallback data source when external APIs are not available
 * This is used when USE_LOCAL_DATA=true or when API tokens are not configured
 */

// Import JSON data files directly - Vite will handle these as modules
import pagesData from '../data/pages.json';
import blogPostsData from '../data/blog-posts.json';
import projectsData from '../data/projects.json';
import careersData from '../data/careers.json';
import teamMembersData from '../data/team-members.json';
import awardsData from '../data/awards.json';
import handbookData from '../data/handbook.json';
import drawingsData from '../data/drawings.json';
import configurationData from '../data/configuration.json';
import handbookConfigurationData from '../data/handbook-configuration.json';
import testimonialsData from '../data/testimonials.json';
import faqsData from '../data/faqs.json';
import homePageData from '../data/home-page.json';

export const LOCAL_DATA = {
  pages: pagesData as any,
  blogPosts: blogPostsData as any,
  projects: projectsData as any,
  careers: careersData as any,
  teamMembers: teamMembersData as any,
  awards: awardsData as any,
  handbook: handbookData as any,
  drawings: drawingsData as any,
  configuration: configurationData as any,
  handbookConfiguration: handbookConfigurationData as any,
  testimonials: testimonialsData as any,
  faqs: faqsData as any,
  homePage: homePageData as any
};

/**
 * Get a page by slug from local data
 */
export function getPageBySlug(slug: string) {
  const fullSlug = slug === '' ? '/' : slug;
  const page = LOCAL_DATA.pages.stories.find(
    (story) => story.full_slug === fullSlug || story.slug === slug
  );
  return page || null;
}

/**
 * Get all blog posts from local data
 */
export function getAllBlogPosts(limit?: number) {
  const posts = LOCAL_DATA.blogPosts.stories.sort((a, b) => {
    return new Date(b.sort_by_date).getTime() - new Date(a.sort_by_date).getTime();
  });

  if (limit) {
    return posts.slice(0, limit);
  }

  return posts;
}

/**
 * Get blog post by slug
 */
export function getBlogPostBySlug(slug: string) {
  return LOCAL_DATA.blogPosts.stories.find((story) => story.slug === slug) || null;
}

/**
 * Get all projects from local data
 */
export function getAllProjects() {
  return LOCAL_DATA.projects.stories;
}

/**
 * Get project by slug
 */
export function getProjectBySlug(slug: string) {
  return LOCAL_DATA.projects.stories.find((story) => story.slug === slug) || null;
}

/**
 * Get all careers from local data
 */
export function getAllCareers() {
  return LOCAL_DATA.careers.stories;
}

/**
 * Get career by slug
 */
export function getCareerBySlug(slug: string) {
  return LOCAL_DATA.careers.stories.find((story) => story.slug === slug) || null;
}

/**
 * Get all team members from local data
 */
export function getAllTeamMembers() {
  return LOCAL_DATA.teamMembers.stories;
}

/**
 * Get team member by slug
 */
export function getTeamMemberBySlug(slug: string) {
  return LOCAL_DATA.teamMembers.stories.find((story) => story.slug === slug) || null;
}

/**
 * Get all awards from local data
 */
export function getAllAwards() {
  return LOCAL_DATA.awards.stories;
}

/**
 * Get all handbook chapters from local data
 */
export function getAllHandbookChapters() {
  return LOCAL_DATA.handbook.stories;
}

/**
 * Get handbook chapter by slug
 */
export function getHandbookBySlug(slug: string) {
  return LOCAL_DATA.handbook.stories.find((story) => story.slug === slug) || null;
}

/**
 * Get drawing by ID from local data
 */
export function getDrawingById(id: string) {
  return LOCAL_DATA.drawings.drawings.find((drawing) => drawing.id === id) || null;
}

/**
 * Get main site configuration from local data
 */
export function getConfiguration() {
  return LOCAL_DATA.configuration.story || null;
}

/**
 * Get handbook-specific configuration from local data
 */
export function getHandbookConfiguration() {
  return LOCAL_DATA.handbookConfiguration.story || null;
}

/**
 * Get all testimonials from local data
 */
export function getTestimonials() {
  return LOCAL_DATA.testimonials.testimonials || [];
}

/**
 * Get all FAQs from local data
 */
export function getFAQs() {
  return LOCAL_DATA.faqs.faqs || [];
}

/**
 * Get home page content from local data
 */
export function getHomePageContent() {
  return LOCAL_DATA.homePage.story || null;
}
