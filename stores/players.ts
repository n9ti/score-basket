import { defineStore } from "pinia";

export interface Player {
  id: number;
  name: string;
}

export const usePlayersStore = defineStore("players", {
  state: () => ({
    players: [] as Player[],
  }),
  getters: {
    getPlayerByName: (state: { players: any[] }) => (name: string) => {
      return state.players.find((player) => player.name === name);
    },
  },
  actions: {
    addPlayer(player: Player) {
      this.players.push(player);
    },
  },
  persist: true,
});
