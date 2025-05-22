import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

async function loginAndWaitForHomepage(page, username) {
  await page.goto("https://vantara.staging.gamma.app/signin");
  // await page.pause();
  // await page.waitForTimeout(Math.floor(Math.random() * 4000 + 1000));

  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(username, { delay: 120 });
  await page
    .getByRole("textbox", { name: "Password" })
    .fill("QJQ7xuq-hvg5zdp5qbp", { delay: 120 });
  await page.getByRole("textbox", { name: "Password" }).press("Tab");
  await page.getByRole("button", { name: "Sign in" }).click();

  // waits for homepage
  await page.getByTestId("docs-view-header").getByText("Gammas").click();
}

async function runKitchenSinkTest(page, username) {
  const kitchenSinkUrlByUsername = {
    "raghav@preceptiv.ai":
      "https://vantara.staging.gamma.app/docs/Vantara-Kitchen-Sink-2h5blrlg0du7qf0?mode=doc",
    "admin@vantara.ai":
      "https://vantara.staging.gamma.app/docs/Vantara-Kitchen-Sink-ehz0q5u0505cpf4?mode=doc",
    "info@zenaway.in":
      "https://vantara.staging.gamma.app/docs/Vantara-Kitchen-Sink-9enqfftnpodtd8z?mode=doc",
  };

  await loginAndWaitForHomepage(page, username);

  await page.goto(kitchenSinkUrlByUsername[username]);

  // replicate user quickly navigating through each slide to find something specific
  for (let i = 1; i < 39; i++) {
    await page.locator(`li:nth-child(${i}) > .filmstrip-item`).click();
    await page.waitForTimeout(500);
  }

  // cycle themes to test gamma-wide changes
  await page.getByTestId("toolbar-theme-button").click();

  await page.getByText("Wine").click();
  await page.waitForTimeout(1000);
  await page.getByText("Sprout").click();
  await page.waitForTimeout(1000);
  await page.getByText("Plant Shop").click();
  await page.waitForTimeout(1000);
  await page
    .getByTestId("doc-theme-drawer")
    .getByRole("button", { name: "Close" })
    .click();
}

export class KitchenSinkWithoutVantaraScenario {
  async run(browser, page) {
    await page.pause();
    await runKitchenSinkTest(page, "admin@vantara.ai");
  }
}

// export class KitchenSinkWithVantaraScenario {
//   async run(browser, page) {
//     await runKitchenSinkTest(page, "raghav@preceptiv.ai");
//   }
// }

async function runGenerateContentTest(page, username) {
  // need to do this copy paste stuff since 'type' and 'fill' time out with this much text
  const modifier = 'Meta';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const ripplingMemo = fs.readFileSync(path.join(__dirname, "rippling-memo.md"), "utf-8");
  await page.setContent(`<div contenteditable>${ripplingMemo}</div>`);
  await page.focus('div');
  await page.keyboard.press(`${modifier}+KeyA`);
  await page.keyboard.press(`${modifier}+KeyC`);

  await loginAndWaitForHomepage(page, username);
  await page.getByTestId("create-from-ai-button").click();
  await page.getByText("Paste in text").click();
  await page.getByTestId("ai-content-editor").click();
  await page.keyboard.press(`${modifier}+KeyV`);
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Generate" }).click();

  console.log('Waiting for redirect to gamma-specific URL')
  while (true) {
    if (page.url().includes('/generate/')) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      continue;
    }
    break;
  }

  await page.getByText('AI Generating').focus();

  console.log('Waiting for AI Generating to be hidden')
  while (true) {
      const isVisible = await page.getByText('AI Generating').isVisible();
      console.log('AI Generating visible:', isVisible);
      if (!isVisible) {
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
  }
  // short enough that the page is definitely not done (since that would bias the results),
  // long enough to buy us time for completion to finish
  await page.waitForTimeout(60 * 1000);
  await page.getByRole("button", { name: "It's great" }, { timeout: 60 * 1000 }).click();
}

// export class GenerateContentWithoutVantaraScenario {
//   async run(browser, page) {
//     await runGenerateContentTest(page, "admin@vantara.ai");
//   }
// }

// export class GenerateContentWithVantaraScenario {
//   async run(browser, page) {
//     await runGenerateContentTest(page, "raghav@preceptiv.ai");
//   }
// }