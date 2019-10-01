#!/bin/bash

ASSERTION_TIMEOUT=15000
SELECTOR_TIMEOUT=10000
WINDOW_WIDTH=1920
WINDOW_HEIGHT=1080
TESTS_PATH="tests/**/**/**/*.spec.js"

CHROME_HEADLESS_LOCAL="chrome:headless --window-size='$WINDOW_WIDTH,$WINDOW_HEIGHT' --no-sandbox"
CHROME_LOCAL="chrome --window-size='$WINDOW_WIDTH,$WINDOW_HEIGHT' --no-sandbox --disable-background-timer-throttling"

CONFIG=$1
shift

# Run locally in browser
if [ "$CONFIG" = "visual" ]; then
    echo "Starting TestCafe in visual-local mode."
    set -x
    testcafe "$CHROME_LOCAL" \
        --debug-on-fail \
        --assertion-timeout $ASSERTION_TIMEOUT \
        --selector-timeout $SELECTOR_TIMEOUT \
        $TESTS_PATH \
        "$@"

# Run locally in headless browser
else
    echo "Starting TestCafe in local mode"
    set -x
    testcafe "$CHROME_HEADLESS_LOCAL" \
        --quarantine-mode  \
        --assertion-timeout $ASSERTION_TIMEOUT \
        --selector-timeout $SELECTOR_TIMEOUT \
        $TESTS_PATH \
        "$@"
fi
