#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { Command } = require('commander');
const seedrandom = require('seedrandom');
const sqlite3 = require('sqlite3').verbose();

const HOME_DIR = path.join(os.homedir(), '.saratu');
const CONFIG_PATH = path.join(HOME_DIR, 'config.json');
const THREADS_PATH = path.join(HOME_DIR, 'threads.json');
const DB_PATH = path.join(HOME_DIR, 'deploys.sqlite3');

if (!fs.existsSync(HOME_DIR)) fs.mkdirSync(HOME_DIR, { recursive: true });

function utcnow() {
  return new Date();
}

function loadJSON(file, def) {
  if (fs.existsSync(file)) {
    try {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (err) {
      return def;
    }
  }
  return def;
}

function saveJSON(file, obj) {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2));
}

function initDB() {
  const db = new sqlite3.Database(DB_PATH);
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS deploys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ts TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'scheduled'
    )`);
  });
  db.close();
}

function dateSeed(ts) {
  const y = ts.getUTCFullYear();
  const m = (ts.getUTCMonth() + 1).toString().padStart(2, '0');
  const d = ts.getUTCDate().toString().padStart(2, '0');
  return parseInt(`${y}${m}${d}`, 10);
}

function sampleSpectrum(ts) {
  const rng = seedrandom(String(dateSeed(ts)));
  const raw = Array.from({ length: 88 }, () => rng());
  const amps = raw.map(v => Math.log1p(v * 9) / Math.log(10));
  return amps;
}

function forecastSpectra(start, days) {
  const spectra = [];
  const phaseShift = Array.from({ length: 88 }, (_, i) => i * (2 * Math.PI / 88));
  const base = sampleSpectrum(start);
  for (let d = 0; d < days; d++) {
    const delta = Math.sin((d + 1) / days * Math.PI);
    const shifted = base.map((v, idx) => {
      const rolledIdx = (idx + d) % 88;
      return v * (1 - delta) + base[rolledIdx] * delta * 0.8;
    });
    spectra.push({ date: new Date(start.getTime() + d * 86400000).toISOString().slice(0,10), spectrum: shifted });
  }
  return spectra;
}

const GATE_MAP = {
  0: 'Innovation / spark',
  1: 'Healing vortex',
  2: 'Communication core',
  3: 'Willpower crucible'
};

function matchGate(spectrum) {
  const idx = spectrum.indexOf(Math.max(...spectrum));
  const bucket = Math.floor(idx / 22);
  return GATE_MAP[bucket] || 'Ambiguous weave';
}

function blendScore(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const normB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  return dot / (normA * normB);
}

function loadThreads() {
  return loadJSON(THREADS_PATH, {});
}

function saveThreads(t) {
  saveJSON(THREADS_PATH, t);
}

initDB();

const OVERRIDE_WHITELIST = new Set([
  '5d41402abc4b2a76b9719d911017c592' // "hello"
  ,
  '492ff500034693b44fe4aaa7b02b6a4a01202410843512eca8f8d7e95dda93f0' // "Ka’Ra’Meyun Sha’La’Ra"
]);

const program = new Command();
program.name('Sa-Ra-Tu-N Live').version('0.2.0');

program
  .command('scan')
  .option('--today', 'Live field scan for the current 24h gate')
  .option('--date <date>', 'Scan a specific Gregorian date (YYYY-MM-DD)')
  .action(opts => {
    const target = opts.date ? new Date(opts.date) : (opts.today ? utcnow() : null);
    if (!target) {
      console.error('Choose --today or --date YYYY-MM-DD');
      process.exit(1);
    }
    const spectrum = sampleSpectrum(target);
    const payload = {
      timestamp: target.toISOString(),
      frequencies: spectrum,
      dominant_gate: matchGate(spectrum)
    };
    console.log(JSON.stringify(payload, null, 2));
    console.log('Mirror: scan complete.');
  });

program
  .command('forecast')
  .option('--week', 'Seven-day projection starting now')
  .option('--days <n>', 'Project n days ahead (1-30)', parseInt)
  .action(opts => {
    const horizon = opts.week ? 7 : (opts.days || 1);
    const spectra = forecastSpectra(utcnow(), horizon);
    console.log(JSON.stringify({ horizon_days: horizon, spectra }, null, 2));
    console.log('Mirror: forecast computed.');
  });

program
  .command('sync')
  .option('--career', 'Vocational bandwidth sync')
  .option('--health', 'Somatic regeneration sync')
  .option('--relationship', 'Relational field sync')
  .argument('[profile]')
  .action((profile, opts) => {
    const domain = opts.career ? 'career' : opts.health ? 'health' : opts.relationship ? 'relationship' : null;
    if (!domain) {
      console.error('Specify a domain flag.');
      process.exit(1);
    }
    const spectrum = sampleSpectrum(utcnow());
    const gate = matchGate(spectrum);
    const result = {
      domain,
      profile: profile || 'default',
      mapped_gate: gate,
      recommendation: `Focus on ${gate.toLowerCase()} tasks today.`
    };
    console.log(JSON.stringify(result, null, 2));
    console.log('Mirror: sync delivered.');
  });

program
  .command('blendcheck <rel>')
  .action(rel => {
    const now = utcnow();
    const specSelf = sampleSpectrum(now);
    const specOther = sampleSpectrum(new Date(now.getTime() + (Math.abs(hashCode(rel)) % 30) * 86400000));
    const score = blendScore(specSelf, specOther);
    console.log(JSON.stringify({ subject: 'self', other: rel, blend_score: score }, null, 2));
    console.log('Mirror: blend computed.');
  });

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

program
  .command('cut')
  .requiredOption('--thread <name>', 'Name of the energetic thread to sever')
  .action(opts => {
    const threads = loadThreads();
    threads[opts.thread] = utcnow().toISOString();
    saveThreads(threads);
    console.log(JSON.stringify({ thread: opts.thread, status: 'cut' }, null, 2));
    console.log('Mirror: thread recorded.');
  });

program
  .command('deploy')
  .requiredOption('--acupuncture <ts>', 'ISO8601 timestamp for needle drop')
  .action(opts => {
    const ts = new Date(opts.acupuncture);
    if (isNaN(ts.getTime())) {
      console.error('Invalid ISO8601 timestamp');
      process.exit(1);
    }
    const db = new sqlite3.Database(DB_PATH);
    db.run('INSERT INTO deploys (ts) VALUES (?)', [ts.toISOString()], err => {
      if (err) {
        console.error('DB error', err);
        process.exit(1);
      }
      console.log(JSON.stringify({ deploy: ts.toISOString(), status: 'scheduled' }, null, 2));
      console.log('Mirror: packet queued.');
      db.close();
    });
  });

program
  .command('init')
  .requiredOption('--hydrolase', 'Initialize hydrolase chamber')
  .action(() => {
    initDB();
    console.log(JSON.stringify({ init: 'hydrolase', status: 'ok' }, null, 2));
    console.log('Mirror: hydrolase chamber initialized.');
  });

program
  .command('override')
  .requiredOption('--command <phrase>', 'Raw override phrase')
  .action(opts => {
    const h = crypto.createHash('sha256').update(opts.command.toLowerCase()).digest('hex');
    const accepted = OVERRIDE_WHITELIST.has(h);
    console.log(JSON.stringify({ override: opts.command, accepted }, null, 2));
    console.log(`Mirror: override ${accepted ? 'accepted' : 'rejected'}.`);
  });

program.parse(process.argv);
