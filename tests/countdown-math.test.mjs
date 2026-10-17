import test from "node:test";
import assert from "node:assert/strict";

function calculateTimeLeft(targetDate, now) {
  const difference = new Date(targetDate).getTime() - now;
  const isPast = difference <= 0;

  return {
    days: isPast ? 0 : Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: isPast ? 0 : Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: isPast ? 0 : Math.floor((difference / (1000 * 60)) % 60),
    seconds: isPast ? 0 : Math.floor((difference / 1000) % 60),
    isPast,
  };
}

test("calculateTimeLeft - future target date", () => {
  const targetDate = "2026-12-11T19:30:00.000Z";
  // 1 day, 2 hours, 3 minutes, 4 seconds before
  const now = new Date("2026-12-10T17:26:56.000Z").getTime();

  const timeLeft = calculateTimeLeft(targetDate, now);
  assert.equal(timeLeft.days, 1);
  assert.equal(timeLeft.hours, 2);
  assert.equal(timeLeft.minutes, 3);
  assert.equal(timeLeft.seconds, 4);
  assert.equal(timeLeft.isPast, false);
});

test("calculateTimeLeft - past date resets all units to zero", () => {
  const targetDate = "2026-12-11T19:30:00.000Z";
  const now = new Date("2026-12-12T00:00:00.000Z").getTime();

  const timeLeft = calculateTimeLeft(targetDate, now);
  assert.equal(timeLeft.days, 0);
  assert.equal(timeLeft.hours, 0);
  assert.equal(timeLeft.minutes, 0);
  assert.equal(timeLeft.seconds, 0);
  assert.equal(timeLeft.isPast, true);
});

test("calculateTimeLeft - exact moment", () => {
  const targetDate = "2026-12-11T19:30:00.000Z";
  const now = new Date(targetDate).getTime();

  const timeLeft = calculateTimeLeft(targetDate, now);
  assert.equal(timeLeft.days, 0);
  assert.equal(timeLeft.hours, 0);
  assert.equal(timeLeft.isPast, true);
});
