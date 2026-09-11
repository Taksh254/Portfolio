export interface Experiment {
  id: string;
  number: string;
  title: string;
  date: string;
  status: "in_progress" | "completed" | "failed";
  domain: string;
  hypothesis: string;
  whatITried: string[];
  result: string;
  whatILearned: string;
  nextIteration: string;
  metricsOrNotes?: string;
}

export const EXPERIMENTS: Experiment[] = [
  {
    id: "exp-021",
    number: "#021",
    title: "AUTONOMOUS AGENT CONCURRENT DAG EXECUTION",
    date: "08.29.26",
    status: "in_progress",
    domain: "Agent Architecture",
    hypothesis:
      "Decomposing complex engineering queries into parallel DAG sub-tasks will reduce latency by 60% compared to sequential linear chain-of-thought, without introducing race conditions in shared context memory.",
    whatITried: [
      "Designed an asynchronous topological sort scheduler in Python using `asyncio` and `LangGraph`.",
      "Implemented a shared atomic blackboard memory where sub-agents write verified findings with version timestamps.",
      "Tested query: 'Compare 5 different vector database index algorithms across memory, indexing time, and recall'.",
    ],
    result:
      "Parallel task dispatch reduced execution time from 94s down to 31s (67% speedup). However, context merging occasionally suffered from redundant cross-referencing.",
    whatILearned:
      "Agents running in parallel need strict isolation in their scratchpads and a final dedicated consolidation agent with strict conflict resolution rules, otherwise their combined output becomes disjointed.",
    nextIteration:
      "Implement a Map-Reduce style synthesis step with strict JSON schemas and AST validation for code samples.",
    metricsOrNotes: "Speedup: 3.03x | Memory: 420MB peak | Concurrency: 6 workers",
  },
  {
    id: "exp-020",
    number: "#020",
    title: "REAL-TIME SPEECH-TO-SPEECH ZERO-LATENCY BUFFERING",
    date: "08.24.26",
    status: "completed",
    domain: "Audio & Streaming AI",
    hypothesis:
      "Chunking inbound PCM audio at 80ms sliding windows into a lightweight streaming VAD model will allow seamless barge-in interruption with under 150ms perceived conversational turn-taking latency.",
    whatITried: [
      "Streamed Opus encoded audio over WebSocket directly to a WebAssembly Silero-VAD instance.",
      "Calculated energy threshold and spectral flux to detect user interruption mid-assistant speech.",
      "Triggered instant abort signal to server audio synthesis queue upon speech detection.",
    ],
    result:
      "Interruption latency dropped to 118ms. Natural turn-taking felt instantaneous with zero voice clipping.",
    whatILearned:
      "Audio buffer underruns occur if the client-side clock drifts relative to server audio chunk delivery. Implementing a dynamic jitter buffer with 20ms elastic padding completely solved the micro-stutters.",
    nextIteration:
      "Package this into a standalone open-source npm module for WebRTC conversational agents.",
    metricsOrNotes: "Turn-around latency: 118ms | False barge-in rate: 1.4%",
  },
  {
    id: "exp-019",
    number: "#019",
    title: "GENERATIVE UI ON-THE-FLY COMPONENT SYNTHESIS",
    date: "08.18.26",
    status: "failed",
    domain: "Compiler & Dynamic UI",
    hypothesis:
      "Streaming raw JSX strings from an LLM and compiling them client-side in an isolated Web Worker via Babel Standalone will allow infinite personalized UI without pre-defined widget components.",
    whatITried: [
      "Set up an in-browser Babel transpile worker with a restricted whitelist of React primitives and Tailwind utility classes.",
      "Attempted streaming token-by-token AST reconstruction to render partial UI components as they were generated.",
      "Benchmarked bundle size, compilation overhead, and rendering jank.",
    ],
    result:
      "FAILED. Bundle size ballooned by 4.2MB due to Babel standalone in browser. Incomplete JSX tokens during streaming caused frequent parser syntax errors and unrecoverable layout layout shifts.",
    whatILearned:
      "Arbitrary in-browser compilation is the wrong abstraction for generative UI. Instead, the LLM should output a strict, typed JSON component tree schema (DSL) that is rendered by pre-compiled, statically typed design system primitives.",
    nextIteration:
      "Pivot to a schema-driven component dictionary approach (JSON-to-React DSL) rather than raw runtime string transpilation.",
    metricsOrNotes: "Worker latency: 280ms/compile | Bundle penalty: +4.2MB | Syntax Failures: 34%",
  },
  {
    id: "exp-018",
    number: "#018",
    title: "ROS2 2D LIDAR SLAM WITH KALMAN ODOMETRY FUSION",
    date: "08.11.26",
    status: "in_progress",
    domain: "Robotics & Embedded",
    hypothesis:
      "Fusing wheel encoder odometry with a 6-axis IMU via an Extended Kalman Filter (EKF) will eliminate scan-matching drift on featureless corridors during 2D LiDAR SLAM mapping.",
    whatITried: [
      "Connected RPLiDAR A1 and MPU6050 to a Raspberry Pi 4 running ROS2 Humble.",
      "Configured `robot_localization` EKF node to fuse yaw rate and linear acceleration with wheel ticks.",
      "Ran mapping benchmarks across a 40-meter hallway with uniform white walls.",
    ],
    result:
      "Rotational drift reduced by 82%. Positional loop closure now triggers reliably even in repetitive corridors.",
    whatILearned:
      "IMU temperature drift over 30 minutes of continuous operation introduced a creeping gyroscope bias. Implementing stationary zero-velocity updates (ZUPT) when wheels are stationary eliminated the cumulative drift.",
    nextIteration:
      "Integrate an optical flow sensor on the undercarriage for ground truth velocity tracking on slippery surfaces.",
    metricsOrNotes: "Mapping error: ±3.4cm over 50m | CPU usage: 38% on Pi 4",
  },
  {
    id: "exp-017",
    number: "#017",
    title: "APPROXIMATE VECTOR SEARCH WITH BIT-LEVEL SIMD",
    date: "08.02.26",
    status: "completed",
    domain: "Algorithms & Low-Level",
    hypothesis:
      "Binarizing 768-dimensional float32 embeddings into 768-bit arrays and computing Hamming distance using CPU POPCNT / AVX-512 instructions will accelerate initial candidate filtering by >15x with <4% recall loss.",
    whatITried: [
      "Applied random hyperplane 1-bit quantization to standard sentence transformer embeddings.",
      "Wrote custom C++ AVX-512 intrinsic kernel for 512-bit XOR and POPCNT distance computation.",
      "Benchmarked on 1,000,000 vector corpus.",
    ],
    result:
      "Query speedup: 18.2x faster than exact Cosine Similarity. Recall@100 remained at 96.1% when used as a coarse-filtering stage before exact reranking.",
    whatILearned:
      "Hamming distance provides an exceptional first-pass filter on CPUs without dedicated GPU tensor cores. The entire 1M vector index fits in just 96MB of L3 cache/RAM.",
    nextIteration:
      "Explore product quantization (PQ) with 4-bit sub-vectors to compare against binary quantization on semantic boundary cases.",
    metricsOrNotes: "Latency: 0.28ms for 1M vectors | Memory: 96MB | Recall@100: 96.1%",
  },
  {
    id: "exp-016",
    number: "#016",
    title: "LOCAL LLM SPECULATIVE DECODING ON APPLE SILICON",
    date: "07.25.26",
    status: "failed",
    domain: "LLM Acceleration",
    hypothesis:
      "Pairing a 0.5B draft model with a 7B target model using unified memory on Apple Silicon Metal will double generation speed for code generation prompts.",
    whatITried: [
      "Configured speculative decoding in llama.cpp using Qwen2.5-Coder-0.5B as draft and Qwen2.5-Coder-7B as verifier.",
      "Tuned draft token batch size from K=2 to K=8 on standard HumanEval programming prompts.",
    ],
    result:
      "FAILED to achieve expected speedup. Draft acceptance rate was only 48% on complex code indentation/syntax, causing verification rollbacks. Overall speedup was only 1.08x, not justifying the 2x VRAM allocation.",
    whatILearned:
      "Draft models must share the exact same vocabulary and similar tokenizer training distribution. For specialized domains like code, the divergence between 0.5B and 7B representations is too steep for high speculative acceptance rates.",
    nextIteration:
      "Test speculative decoding with Medusa-style multi-head prediction on the 7B model directly, avoiding a second model instance.",
    metricsOrNotes: "Acceptance Rate: 48% | Effective Speedup: 1.08x | Overhead: +1.2GB VRAM",
  },
];
