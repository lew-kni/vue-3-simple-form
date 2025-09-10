import { defineStore } from 'pinia';

export const useViewedTitlesStore = defineStore(
	'viewedTitles',
	{
		state: () => ({
			viewedTitles: [] as Array<{
				imdbID: string;
				Type: string;
				Year: string;
				Poster: string;
				Title: string;
			}>,
		}),
		actions: {
			addViewedTitle(title: {
				imdbID: string;
				Type: string;
				Year: string;
				Poster: string;
				Title: string;
			}) {
				const exists = this.viewedTitles.some((t) => t.imdbID === title.imdbID);
				if (!exists) {
					this.viewedTitles.push(title);
				}
			},
			getViewedTitles() {
				return this.viewedTitles;
			},
			clearViewedTitles() {
				this.viewedTitles = [];
			},
		},
	},
	{
		persist: true,
	}
);
