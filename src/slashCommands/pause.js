module.exports = {
  name: 'pause',
  description: 'Pause the current song',
  default_permission: false,

  async execute(interaction) {
    const { client } = interaction;

    await interaction.deferReply();

    const queue = client.player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) {
      return interaction.editReply({
        embeds: [{ description: '❌ | No music is being played!' }],
      });
    }
    const paused = queue.setPaused(true);
    return interaction.editReply({
      embeds: [
        {
          description: paused
            ? '⏸ | Paused!'
            : '❌ | Something went wrong! Use /resume to play again.',
        },
      ],
    });
  },
};
