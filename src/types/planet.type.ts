export interface IPlanet {
  kepid: string;
  kepoi_name: string;
  kepler_name?: string;
  koi_disposition: string;
  koi_pdisposition?: string;
  koi_score?: string;
  koi_fpflag_nt?: string;
  koi_fpflag_ss?: string;
  koi_fpflag_co?: string;
  koi_fpflag_ec?: string;
  koi_period: number;
  koi_period_err1?: string;
  koi_period_err2?: string;
  koi_time0bk?: string;
  koi_time0bk_err1?: string;
  koi_time0bk_err2?: string;
  koi_impact?: string;
  koi_impact_err1?: string;
  koi_impact_err2?: string;
  koi_duration?: string;
  koi_duration_err1?: string;
  koi_duration_err2?: string;
  koi_depth?: string;
  koi_depth_err1?: string;
  koi_depth_err2?: string;
  koi_prad: number;
  koi_prad_err1?: string;
  koi_prad_err2?: string;
  koi_teq: number;
  koi_teq_err1?: string;
  koi_teq_err2?: string;
  koi_insol: number;
  koi_insol_err1?: string;
  koi_insol_err2?: string;
  koi_model_snr?: string;
  koi_tce_plnt_num?: string;
  koi_tce_delivname?: string;
  koi_steff?: string;
  koi_steff_err1?: string;
  koi_steff_err2?: string;
  koi_slogg?: string;
  koi_slogg_err1?: string;
  koi_slogg_err2?: string;
  koi_srad?: string;
  koi_srad_err1?: string;
  koi_srad_err2?: string;
  ra?: string;
  dec?: string;
  koi_kepmag?: string;
}

export enum KoiDisposition {
  confirmed = "CONFIRMED",
  candidate = "CANDIDATE",
  false_positive = "FALSE POSITIVE",
}

export type PlanetsByDisposition = {
  name: string;
  planets: number;
};

export interface IPieData {
  name: string;
  value: number;
  color: string;
}