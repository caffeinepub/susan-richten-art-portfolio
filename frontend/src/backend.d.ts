import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    addUniqueVisitor(visitorId: string): Promise<boolean>;
    getPageViewCount(): Promise<bigint>;
    getUniqueVisitorCount(): Promise<bigint>;
    incrementPageView(): Promise<void>;
}
