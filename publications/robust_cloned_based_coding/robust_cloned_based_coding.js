/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

window.addEventListener(
  "load",
  function (e) {
    populate();
  },
  false
);

const headers = ["", "Original", "Clone-based WaveNet", "MELP-based WaveNet"];

const wavs = {
  clean: {
    description: "Clean",
    original: "ref.wav",
    clones: "clones_clean.wav",
    melp: "melp_clean.wav",
  },
  snr10db: {
    description: "SNR = 10 dB",
    original: "noisy_10db.wav",
    clones: "clones_10db.wav",
    melp: "melp_10db.wav",
  },
  snr0db: {
    description: "SNR = 0 dB",
    original: "noisy_0db.wav",
    clones: "clones_0db.wav",
    melp: "melp_0db.wav",
  },
};

function populate() {
  let div = document.getElementById("examples");

  for (let utt = 0; utt < 20; utt++) {
    let table = document.createElement("table");
    table.className = "mdl-data-table";

    let headerRow = table.createTHead().insertRow();
    headers.forEach((header) => {
      let th = document.createElement("th");
      th.innerText = header;
      headerRow.appendChild(th);
    });

    Object.values(wavs).forEach((wav) => {
      let row = table.insertRow();
      row.insertCell().innerText = wav.description;

      let audio = createAudio(utt, wav.original);
      row.insertCell().appendChild(audio);

      audio = createAudio(utt, wav.clones);
      row.insertCell().appendChild(audio);

      audio = createAudio(utt, wav.melp);
      row.insertCell().appendChild(audio);
    });

    let uttTitle = document.createTextNode("Utterance " + utt);
    let uttTitleEl = document.createElement("h6");
    uttTitleEl.appendChild(uttTitle);

    div.appendChild(uttTitleEl);
    div.appendChild(table);
  }
}

function createAudio(utterance, wav) {
  const src = "./wavs/utterance_" + utterance + "/" + wav;
  const audio = document.createElement("audio");
  audio.controls = "controls";
  audio.preload = "none";
  audio.src = src;
  audio.innerText = "Your browser does not support the audio element.";
  return audio;
}
