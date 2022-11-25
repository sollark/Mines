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
      break;
    case EMOJI_SAD:
      resetBtn.innerHTML = EMOJI_SAD;
      break;
    case EMOJI_COOL:
      resetBtn.innerHTML = EMOJI_COOL;
      break;
  }
}
