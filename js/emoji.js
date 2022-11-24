const EMOJI_SMILE = '😀️';
const EMOJI_SWEATY = '😅️';
const EMOJI_SAD = '🤯️';
const EMOJI_COOL = '😎️';

function updateEmoji(emoji) {
  const resetBtn = document.querySelector('.emoji');

  switch (emoji) {
    case EMOJI_SMILE:
      resetBtn.innerHTML = EMOJI_SMILE;
      break;
    case EMOJI_SWEATY:
      resetBtn.innerHTML = EMOJI_SWEATY;
      setTimeout(() => {
        resetBtn.innerHTML = EMOJI_SMILE;
      }, 2000);
      break;
    case EMOJI_SAD:
      setTimeout(() => {
        resetBtn.innerHTML = EMOJI_SAD;
      }, 1000);

      break;
    case EMOJI_COOL:
      resetBtn.innerHTML = EMOJI_COOL;
      break;
  }
}
