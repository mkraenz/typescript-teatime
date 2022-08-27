const port = location.host.split(":")[1];
export const isProd = port === "63140";
console.log(`Running in ${isProd ? "production" : "development"} mode`);

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
