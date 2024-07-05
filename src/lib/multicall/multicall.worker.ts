import type { MulticallRequestConfig } from "./types";
import { MAX_TIMEOUT, Multicall } from "./utils";

async function executeMulticall(chainId: number, request: MulticallRequestConfig<any>) {
  const multicall = await Multicall.getInstance(chainId);

  return multicall?.call(request, MAX_TIMEOUT);
}

self.addEventListener("message", run);

async function run(event) {
  performance.mark("multicall-worker-start");
  const start = Date.now();
  const { PRODUCTION_PREVIEW_KEY, chainId, request, id } = event.data;
  // @ts-ignore
  self.PRODUCTION_PREVIEW_KEY = PRODUCTION_PREVIEW_KEY;

  try {
    const result = await executeMulticall(chainId, request);

    postMessage({
      id,
      result,
    });
  } catch (error) {
    postMessage({ id, error: error });
  }

  const end = Date.now();
  console.log("multicall-worker", end - start, "ms");
  performance.mark("multicall-worker-end");
  performance.measure("multicall-worker", "multicall-worker-start", "multicall-worker-end");
}

declare class MulticallWorker extends Worker {
  constructor();
}

export default MulticallWorker;
