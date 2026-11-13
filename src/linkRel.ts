import { createContext, useContext } from 'react';

/** Rel of outgoing links unless the page sets another one. */
export const DEFAULT_LINK_REL = 'noopener noreferrer';

/**
 * The `rel` every outgoing link on a page uses. own.page gives pages it
 * doesn't vouch for `ugc nofollow noopener noreferrer`; widgets read it here
 * instead of hardcoding their own.
 */
const LinkRelContext = createContext<string>(DEFAULT_LINK_REL);

export const LinkRelProvider = LinkRelContext.Provider;

export const useLinkRel = () => useContext(LinkRelContext);
