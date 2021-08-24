const isProd = window.location.hostname !== "localhost";
export const DEV = isProd
    ? {}
    : {
          startInGameOverScene: false,
          skipTitle: false,
          loseDisabled: false,
          instantKill: false,
          disableParticles: true,
          validateMonsterTextures: false,
      };
