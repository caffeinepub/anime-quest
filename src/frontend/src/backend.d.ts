import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Character {
    id: bigint;
    appearance: string;
    name: string;
    riddle: string;
    answer: string;
    story: string;
}
export interface backendInterface {
    getAllCharacters(): Promise<Array<Character>>;
    getCharacter(characterId: bigint): Promise<Character>;
    getUnlockedCharacters(): Promise<Array<Character>>;
    unlockCharacter(characterId: bigint, answer: string): Promise<boolean>;
}
