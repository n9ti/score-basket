import { defineStore } from "pinia";

export interface Game {
  gameId: number;
}

export interface GameStat {
  gameId: number;
  score: {
    teamA: number;
    teamB: number;
  };
  players: {
    teamA: number[];
    teamB: number[];
  };
}

export interface PlayerStat {
  gameId: number;
  playerId: number;
  team: string;
  result: string;
  score: number;
  treePoint: number;
  twoPoint: number;
  assist: number;
}

export interface Player {
  id: number;
  name: string;
  img: string;
}

export interface Activity {
  id: number;
  gameId: number;
  team: string;
  playerId: number;
  action: string;
  score: number;
}

export const useGamesStore = defineStore("games", {
  state: () => ({
    currentGame: { gameId: 0 } as Game,
    players: [] as Player[],
    activitys: [] as Activity[],
    currentTeamA: [] as number[],
    currentTeamB: [] as number[],
    gamesStat: [] as GameStat[],
    playesrStat: [] as PlayerStat[],
  }),
  getters: {
    getAvailablePlayers:
      (state: { players: any[]; currentTeamA: any[]; currentTeamB: any[] }) =>
      () => {
        return state.players.filter((player) => {
          return (
            state.currentTeamA.findIndex((playerId) => playerId === player.id) <
              0 &&
            state.currentTeamB.findIndex((playerId) => playerId === player.id) <
              0
          );
        });
      },
    getPlayerImg: (state: { players: any[] }) => (playerId: number) => {
      return state.players.find((player) => player.id === playerId).img;
    },
    getPlayerName: (state: { players: any[] }) => (playerId: number) => {
      return state.players.find((player) => player.id === playerId).name;
    },
  },
  actions: {
    //
    // Game //
    //
    endGame() {
      let teamAScore = this.activitys
        .filter(
          (a) =>
            a.gameId === this.currentGame.gameId &&
            a.team === "A" &&
            a.action === "score"
        )
        .reduce((accumulator, object) => {
          return accumulator + object.score;
        }, 0);
      let teamBScore = this.activitys
        .filter(
          (a) =>
            a.gameId === this.currentGame.gameId &&
            a.team === "B" &&
            a.action === "score"
        )
        .reduce((accumulator, object) => {
          return accumulator + object.score;
        }, 0);
      //
      this.gamesStat.push({
        gameId: this.currentGame.gameId,
        score: {
          teamA: teamAScore,
          teamB: teamBScore,
        },
        players: {
          teamA: [...this.currentTeamA],
          teamB: [...this.currentTeamB],
        },
      });
      //
      this.currentTeamA.forEach((playerId) => {
        this.playesrStat.push({
          gameId: this.currentGame.gameId,
          playerId: playerId,
          team: "A",
          result: teamAScore > teamBScore ? "WIN" : "LOSE",
          score: this.activitys
            .filter(
              (a) =>
                a.gameId === this.currentGame.gameId &&
                a.playerId === playerId &&
                a.action === "score"
            )
            .reduce((accumulator, object) => {
              return accumulator + object.score;
            }, 0),
          treePoint: this.activitys.filter(
            (a) =>
              a.gameId === this.currentGame.gameId &&
              a.playerId === playerId &&
              a.action === "score" &&
              a.score === 3
          ).length,
          twoPoint: this.activitys.filter(
            (a) =>
              a.gameId === this.currentGame.gameId &&
              a.playerId === playerId &&
              a.action === "score" &&
              a.score === 2
          ).length,
          assist: this.activitys.filter(
            (a) =>
              a.gameId === this.currentGame.gameId &&
              a.playerId === playerId &&
              a.action === "assist"
          ).length,
        });
      });
      //
      this.currentTeamB.forEach((playerId) => {
        this.playesrStat.push({
          gameId: this.currentGame.gameId,
          playerId: playerId,
          team: "B",
          result: teamAScore < teamBScore ? "WIN" : "LOSE",
          score: this.activitys
            .filter(
              (a) =>
                a.gameId === this.currentGame.gameId &&
                a.playerId === playerId &&
                a.action === "score"
            )
            .reduce((accumulator, object) => {
              return accumulator + object.score;
            }, 0),
          treePoint: this.activitys.filter(
            (a) =>
              a.gameId === this.currentGame.gameId &&
              a.playerId === playerId &&
              a.action === "score" &&
              a.score === 3
          ).length,
          twoPoint: this.activitys.filter(
            (a) =>
              a.gameId === this.currentGame.gameId &&
              a.playerId === playerId &&
              a.action === "score" &&
              a.score === 2
          ).length,
          assist: this.activitys.filter(
            (a) =>
              a.gameId === this.currentGame.gameId &&
              a.playerId === playerId &&
              a.action === "assist"
          ).length,
        });
      });
      //
      this.currentGame.gameId++;
    },
    resetAllGames() {
      this.gamesStat.splice(0, this.gamesStat.length);
      this.playesrStat.splice(0, this.playesrStat.length);
      this.activitys.splice(0, this.activitys.length);

      this.currentTeamA.splice(0, this.currentTeamA.length);
      this.currentTeamB.splice(0, this.currentTeamB.length);

      this.currentGame.gameId = 0;
    },
    //
    // Player //
    //
    addPlayer(player: Player) {
      this.players.push(player);
    },
    removePlayer(id: number) {
      const index = this.players.findIndex((player) => player.id === id);
      this.players.splice(index, 1);
    },
    //
    // currentTeam //
    //
    addPlayerToTeam(team: string, player: Player) {
      if (team === "A") this.currentTeamA.push(player.id);
      else if (team === "B") this.currentTeamB.push(player.id);
    },
    removePlayerFromTeam(team: string, id: number) {
      if (team === "A") {
        const index = this.currentTeamA.findIndex(
          (playerId) => playerId === id
        );
        this.currentTeamA.splice(index, 1);
      } else if (team === "B") {
        const index = this.currentTeamB.findIndex(
          (playerId) => playerId === id
        );
        this.currentTeamB.splice(index, 1);
      }
    },
    removeAllPlayerFromTeam(team: string) {
      if (team === "A") this.currentTeamA.splice(0, this.currentTeamA.length);
      else if (team === "B")
        this.currentTeamB.splice(0, this.currentTeamB.length);
    },
    //
    // Activity //
    //
    addActivity(activity: Activity) {
      this.activitys.push(activity);
    },
    removeActivity(id: number) {
      const index = this.activitys.findIndex((key) => key.id === id);
      this.activitys.splice(index, 1);
    },
    removeAllPlayers() {
      this.players.splice(0, this.players.length);
    },
    addSaturdayHooper() {
      let saturdayHooper = [
        {
          id: 900001,
          name: "bank",
          img: "/players/bank.png",
        },
        {
          id: 900002,
          name: "benz",
          img: "/players/benz.png",
        },
        {
          id: 900003,
          name: "capsule",
          img: "/players/capsule.png",
        },
        {
          id: 900004,
          name: "jan",
          img: "/players/jan.png",
        },
        {
          id: 900005,
          name: "jeed",
          img: "/players/jeed.png",
        },
        {
          id: 900006,
          name: "man",
          img: "/players/man.png",
        },
        {
          id: 900007,
          name: "max",
          img: "/players/max.png",
        },
        {
          id: 900008,
          name: "nae",
          img: "/players/nae.png",
        },

        {
          id: 900009,
          name: "neng",
          img: "/players/neng.png",
        },
        {
          id: 900010,
          name: "note",
          img: "/players/note.png",
        },
        {
          id: 900011,
          name: "nui",
          img: "/players/nui.png",
        },
        {
          id: 900012,
          name: "pla",
          img: "/players/pla.png",
        },

        {
          id: 900013,
          name: "pop",
          img: "/players/pop.png",
        },
        {
          id: 900014,
          name: "tong",
          img: "/players/tong.png",
        },
        {
          id: 900015,
          name: "v",
          img: "/players/v.png",
        },
        {
          id: 900016,
          name: "will",
          img: "/players/will.png",
        },
        {
          id: 900017,
          name: "it",
          img: "/players/it.png",
        },
      ];
      this.players.push(...saturdayHooper);
    },
  },
  persist: true,
});
