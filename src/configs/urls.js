export const baseURL = 'https://tamarix-technical-interview.herokuapp.com'

export const portfolios = () => `/users/me/portfolios`
export const portfolioDetails = (id) => `/users/me/portfolios/${id}`
export const scenarios = (portfolioId) => `/users/me/portfolios/${portfolioId}/scenarios`
export const scenariosDetails = (portfolioId, scenarioId) => `/users/me/portfolios/${portfolioId}/scenarios/${scenarioId}`
export const forecasts = () => `/users/me/forecasts`